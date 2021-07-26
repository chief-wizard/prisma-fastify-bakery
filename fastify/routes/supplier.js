const { PrismaClient } = require("@prisma/client")
const { supplier } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/supplier', async (req, res) => {
        const list = await supplier.findMany({
            select: {
                id: true,
                name: true,
                contact: true,
                email: true,
                phone_num: true,
                address: true
            }
        })       
        res.send(list)
    })
}
    
module.exports = routes