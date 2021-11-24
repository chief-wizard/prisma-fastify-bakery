// @ts-check
const { PrismaClient } = require("@prisma/client")
const { product } = new PrismaClient()

async function routes (fastify, options) {

    fastify.get('/products', async (req, res) => {
        const list = await product.findMany({
            take: 100,
            include: {
                ingredients: true
            }
        })   
        res.send(list)
    })

    fastify.post('/product/create', async (req, res) => {
        let addProduct = req.body;

        const productExists = await product.findUnique({
            where: {
                name: addProduct.name
            }
        })

        if(!productExists){
            let newProduct = await product.create({
                data: {
                    name: addProduct.name,
                    type: addProduct.type,
                    category: addProduct.category,
                    sales: addProduct.sales,
                    price: addProduct.price,
                    ingredients: {
                        connect: addProduct.ingredients,
                   },
                },
                include: {
                    ingredients: true
                }
            })
            res.send(newProduct);
        } else {
            res.code(400).send({message: 'record already exists'})            
        }
    })


    fastify.put('/products', async (req, res) => {
        let { id, name, type, category, ingredients, sales, price } = req.body;

        const updatedProduct = await product.update({
           where: {
            "id": id
           },
           data: {
                name: name != null ? name : undefined,
                type: type != null ? type : undefined,
                category: category != null ? category : undefined,
                ingredients: ingredients != null ? ingredients : undefined,
                sales: sales != null ? sales : undefined,
                price: price != null ? price : undefined,
           }
        })
        res.send(updatedProduct);
    })

    fastify.delete('/products', async (req, res) => {
        let productsId = req.body;

        const deletedProduct = await product.delete({
            where: productsId
        })     
        res.send(deletedProduct)
    })

    fastify.post('/products/ingredients', async (req, res) => {
        let productsData = req.body;

        let productToUpdate = await product.update({
            where: {
                id: productsData.id
            },
            data: {
                ingredients: {
                    connect: productsData.ingredients
                }
            },
            include: {
                ingredients: true
            }
        })
        res.send(productToUpdate);
    })

    fastify.delete('/products/ingredients', async (req, res) => {
        let productsData = req.body;

        let productToDelete = await product.update({
            where: {
                id: productsData.id
            },
            data: {
                ingredients: {
                    disconnect: productsData.ingredients
                }
            },
            include: {
                ingredients: true
            }
        })
        res.send(productToDelete);
    })
}
    
module.exports = routes
