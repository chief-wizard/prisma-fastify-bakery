const { PrismaClient } = require("@prisma/client")
const { employee } = new PrismaClient()

async function routes (fastify, options) {
    fastify.get('/employees', async (req, res) => {
        const list = await employee.findMany({
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