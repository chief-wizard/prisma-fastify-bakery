const { PrismaClient } = require("@prisma/client")

const { ingridient } = new PrismaClient()

async function routes (fastify, options) {

    // get all the ingridients
    fastify.get('/ingridients', async (req, res) => {
        const ingridientsList = await ingridient.findMany({
            select: {
                id: true,
                name: true,
                allergen: true,
                vegan: true,
                vegetarian: true,
                goods: true,
                goods_id: true
            }
        })
        
        res.send(ingridientsList)
    })

    // create
    fastify.post('/ingridients', async (req, res) => {
        let addIngridient = req.body;

        const ingridientExists = await ingridient.findUnique({
            where: {
                name: addIngridient.name
            }
        })

        if(!ingridientExists){
            let newIngridient = await ingridient.create({
                data: addIngridient
            })

            res.send(newIngridient)
        }
        
        res.code(400).send({message: 'Ingridient already exists'})
    })

    // update
    fastify.put('/ingridients', async (req, res) => {
        let { id, name, type, allergen, vegan, vegetarian, goods } = req.body;

        const updatedGood = await ingridient.update({
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
    fastify.delete('/ingridients', async (req, res) => {
        let goodsId = req.body;

        const deletedGood = await ingridient.delete({
            where: goodsId
        })
                
        res.send(deletedGood)
    })
  }
    
  module.exports = routes