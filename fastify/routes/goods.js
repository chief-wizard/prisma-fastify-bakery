const { PrismaClient } = require("@prisma/client")

const { goods } = new PrismaClient()

async function routes (fastify, options) {
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
  }
    
  module.exports = routes