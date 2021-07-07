// @ts-check
const { PrismaClient } = require("@prisma/client")

const { good } = new PrismaClient()

async function routes (fastify, options) {

    // list them all
    fastify.get('/goods', async (req, res) => {
        const list = await good.findMany({
						include: {
							ingredients: true
						}
        })
        
        res.send(list)
    })

    // create
    fastify.post('/goods', async (req, res) => {
        let addGood = req.body;

        const goodExists = await goods.findUnique({
            where: {
                name: addGood.name
            }
        })

        // check if the record exists based on the name param, which is unique
        // if it doesn't create a new one
        if(!goodExists){
            let newGood = await goods.create({
                data: addGood
            })

            res.send(newGood);
        // otherwise send a message that it already exists.
        } else {
            res.code(400).send({message: 'record already exists'})            
        }
        
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


    //adds ingriend to the good

    // ingridients param should be an array of objects [{id:2}, {id:3} ...]
    fastify.post('/goods/ingridients', async (req, res) => {
        let goodsData = req.body;



        let goodToUpdate = await goods.update({
            where: {
                id: goodsData.id
            },
            data: {
                ingridients: {
                    connect: goodsData.ingridients
                }
            },
            include: {
                ingridients: true
            }
        })

        res.send(goodToUpdate);
    })


    // ingridients param should be an array of objects [{id:2}, {id:3} ...]
    // {"id": 1, "ingridients": [{"id": 23}, {"id":24}]}
    fastify.delete('/goods/ingridients', async (req, res) => {
        let goodsData = req.body;



        let goodToDelete = await goods.update({
            where: {
                id: goodsData.id
            },
            data: {
                ingridients: {
                    disconnect: goodsData.ingridients
                }
            },
            include: {
                ingridients: true
            }
        })

        res.send(goodToDelete);
    })


  }
    
  module.exports = routes
