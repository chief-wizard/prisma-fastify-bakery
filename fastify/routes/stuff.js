const { PrismaClient } = require("@prisma/client")

const { stuff } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/stuff', async (req, res) => {
        const list = await stuff.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                duties: true
            }
        })
        
        res.send(list)
    })
  }
    
  module.exports = routes