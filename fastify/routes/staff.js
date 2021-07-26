const { PrismaClient } = require("@prisma/client")
const { staff } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/staff', async (req, res) => {
        const list = await staff.findMany({
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