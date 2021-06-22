const { PrismaClient } = require("@prisma/client")

const { ingridient } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/ingridients', async (req, res) => {
        const list = await ingridient.findMany({
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
        
        res.send(list)
    })
  }
    
  module.exports = routes