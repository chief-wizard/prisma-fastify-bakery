// This file demonstrates CRUD (Create, Update, Delete) functionality with Prisma including retrieving and creating related records

// @ts-check

const { PrismaClient } = require("@prisma/client");
const { product } = new PrismaClient();

/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Route to retrieve the first 100 products
    fastify.get('/products', async (req, res) => {

        // Retrieve the first 100 products, including the related ingredients
        let list = await product.findMany({
            take: 100,
            include: {
                ingredients: true
            }
        });

        // Send the response
        res.send(list);
    });

    // Route to create a new product
    fastify.post('/products', async (req, res) => {

        // Assign the POST request body to a new product
        let addProduct = req.body;

        // Check if a product with the same name already exists
        let productExists = await product.findUnique({
            where: {
                name: addProduct.name
            }
        });

        // If the product does not exist, create it in the database with Prisma
        // Related ingredients are created or connected with the connectOrCreate statement
        if (!productExists) {

            let newProduct = await product.create({
                data: {
                    name: addProduct.name,
                    type: addProduct.type,
                    category: addProduct.category,
                    sales: addProduct.sales,
                    price: addProduct.price,
                    ingredients: {
                        // This section will add multiple ingredients from the request by looping through them
                        connectOrCreate: addProduct.ingredients.map((ingredient) =>{

                            return {
                                where:{
                                    name: ingredient.name
                                },
                                create: ingredient
                            }

                        })
                    },
                },
                include: {
                    ingredients: true
                }
            });

            res.send(newProduct);

        } else {

            // The product already exists - return an error with a message
            res.code(400).send({ message: 'record already exists' });

        }
    });

    // Route to update an existing product in the Database
    fastify.put('/products/:productId', async (req, res) => {

        // Retrieve the id of the product to be updated from the request URL parameters
        let productId = parseInt(req.params.productId);

        let { name, type, category, ingredients, sales, price } = req.body;

        // Update the existing product in the database by updating records where the id matches
        let updatedProduct = await product.update({
            where: {
                id: productId
            },
            data: {
                name: name != null ? name : undefined,
                type: type != null ? type : undefined,
                category: category != null ? category : undefined,
                sales: sales != null ? sales : undefined,
                price: price != null ? price : undefined,
            }
        });

        res.send(updatedProduct);

    });

    // Route to delete a product from the database
    fastify.delete('/products/:productId', async (req, res) => {

        // Retrieve the id of the ingredient to be updated from the request URL parameters
        let productId = parseInt(req.params.productId);

        // Delete product where the ID matches
        let deletedProduct = await product.delete({
            where: {
                id: productId
            }
        });

        res.send(deletedProduct);

    });

    // Route to update a product by adding new ingredients
    fastify.post('/products/:productId/ingredients', async (req, res) => {

        // Retrieve the id of the ingredient to be updated from the request URL parameters
        let productId = parseInt(req.params.productId);

        // Retrieve the data from the POST request body
        let newIngredients = req.body;

        // Connect the product with the ingredients specified in productsData - this will only connect existing ingredients!
        let productToUpdate = await product.update({
            where: {
                id: productId
            },
            data: {
                ingredients: {
                    connect: newIngredients
                }
            },
            include: {
                ingredients: true
            }
        });

        res.send(productToUpdate);

    });

    // Route to remove ingredients from a product
    fastify.delete('/products/:productId/ingredients', async (req, res) => {

        // Retrieve the id of the ingredient to be updated from the request URL parameters
        let productId = parseInt(req.params.productId);

        // Retrieve the data from the POST request body
        let removeIngredients = req.body;

        // Disconnect the product from the ingredients specified in ProductsData
        let productToDelete = await product.update({
            where: {
                id: productId
            },
            data: {
                ingredients: {
                    disconnect: removeIngredients
                }
            },
            include: {
                ingredients: true
            }
        });

        res.send(productToDelete);

    });
}

module.exports = routes;
