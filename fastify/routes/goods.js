const { PrismaClient } = require("@prisma/client")

const { goods } = new PrismaClient()

async function routes (fastify, options) {

    // list them all
    fastify.get('/goods', async (req, res) => {
        const list = await goods.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                category: true,
                ingridients: true,
                sales: true,
                price: true
            }
        })
        
        res.send(list)
    })

    // create
    fastify.post('/goods/add', async (req, res) => {
        let addGood = req.body;

        const goodExists = await goods.findUnique({
            where: {
                name: addGood.name
            }
        })

        if(!goodExists){
            let newGood = await goods.create({
                data: addGood
            })
        }
        
        res.code(400).send({message: 'record already exists'})
    })

    // update
    fastify.put('/goods', async (req, res) => {
        let { id, name, type, category, ingridients, sales, price } = req.body;

        const updatedGood = await goods.update({
           where: {
            "id": id
           },
           data: {
                //  only update the fields that are present in the request body
                name: name != null ? name : undefined,
                type: type != null ? type : undefined,
                category: category != null ? category : undefined,
                ingridients: ingridients != null ? ingridients : undefined,
                sales: sales != null ? sales : undefined,
                price: price != null ? price : undefined,
           }
        })
        
        res.send(updatedGood);
    })

    //  alternatevbbelly we can use request param instead of body
    // fastify.delete('/goods/:userId', async (req, res) => {
    //     var userId = request.params.userId

    //  expects {"id": idNumber}
    // delete
    fastify.delete('/goods', async (req, res) => {
        let goodsId = req.body;

        const deletedGood = await goods.delete({
            where: goodsId
        })
                
        res.send(deletedGood)
    })
  }
    
  module.exports = routes