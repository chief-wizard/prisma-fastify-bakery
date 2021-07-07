const { PrismaClient } = require("@prisma/client")

const { sales } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/sales', async (req, res) => {
        const list = await sales.findMany({
            select: {
                id: true,
                date: true,
                item: true
            }
        })
        
        res.send(list)
    })
  }
    
  module.exports = routes