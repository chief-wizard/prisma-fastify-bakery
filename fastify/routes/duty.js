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

    fastify.get('/duty/id/:dutyId', async(req, res) => {
        // try it without parceInt to see what happens
        //var dutyId = (req.params.dutyId)
        var dutyId = parseInt(req.params.dutyId)

        const list = await duty.findMany({
            select: {
                id: true,
                task: true,
                stuff: true
            },
            where: {
                id: dutyId
            }
        })
        res.send(list)
    })

    fastify.get('/duty/task/:taskName', async(req, res) => {
        var taskName = req.params.taskName

        const list = await duty.findMany({
            select: {
                id: true,
                task: true,
                stuff: true
            },
            where: {
               task : taskName
            }
        })
        res.send(list)
    })
}
    
module.exports = routes