const { PrismaClient } = require("@prisma/client")

const { ingredient } = new PrismaClient()

async function routes (fastify, options) {

    // get all the ingredients
    fastify.get('/ingredients', async (req, res) => {
        const ingredientsList = await ingredient.findMany({
            select: {
                id: true,
                name: true,
                allergen: true,
                vegan: true,
                vegetarian: true,
                goods: true,
                good_id: true
            }
        })
        
        res.send(ingredientsList)
    })

    // create
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

    // update
    fastify.put('/ingredients', async (req, res) => {
        let { id, name, type, allergen, vegan, vegetarian, goods } = req.body;

        const updatedGood = await ingredient.update({
           where: {
            "id": id
           },
           data: {
                //  only update the fields that are present in the request body
                name: name != null ? name : undefined,
                type: type != null ? type : undefined,
                allergen: allergen != null ? allergen : undefined,
                vegan: vegan != null ? vegan : undefined,
                vegetarian: vegetarian != null ? vegetarian : undefined,
                goods: goods != null ? goods : undefined,
           }
        })
        
        res.send(updatedGood);
    })

    // delete
    fastify.delete('/ingredients', async (req, res) => {
        let goodsId = req.body;

        const deletedGood = await ingredient.delete({
            where: goodsId
        })
                
        res.send(deletedGood)
    })
  }
    
  module.exports = routes
