const { PrismaClient } = require("@prisma/client")

const { duty } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/duty', async (req, res) => {
        const list = await duty.findMany({
            select: {
                id: true,
                task: true,
                stuff: true
            }
        })
        
        res.send(list)
    })
  }
    
  module.exports = routes