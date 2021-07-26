const { PrismaClient } = require("@prisma/client")

const { ingredient } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/ingredients', async (req, res) => {
        const ingredientsList = await ingredient.findMany({
            select: {
                id: true,
                name: true,
                allergen: true,
                vegan: true,
                vegetarian: true,
                products: true,
                products_id: true
            }
        })
        res.send(ingredientsList)
    })

    fastify.post('/ingredients', async (req, res) => {
        let addIngridient = req.body;

        const ingredientExists = await ingredient.findUnique({
            where: {
                name: addIngridient.name
            }
        })

        if(!ingredientExists){
            let newIngridient = await ingredient.create({
                data: addIngridient
            })

            res.send(newIngridient)
        }
        res.code(400).send({message: 'Ingridient already exists'})
    })

    fastify.put('/ingredients', async (req, res) => {
        let { id, name, type, allergen, vegan, vegetarian, products } = req.body;

        const updatedProduct = await ingredient.update({
           where: {
            "id": id
           },
           data: {
                name: name != null ? name : undefined,
                type: type != null ? type : undefined,
                allergen: allergen != null ? allergen : undefined,
                vegan: vegan != null ? vegan : undefined,
                vegetarian: vegetarian != null ? vegetarian : undefined,
                products: products != null ? products : undefined,
           }
        })
        res.send(updatedProduct);
    })

    fastify.delete('/ingredients', async (req, res) => {
        let ingredientId = req.body;

        const deletedIngredient = await ingredient.delete({
            where: ingredientId
        })    
        res.send(deletedIngredient)
    })
}
    
module.exports = routes
