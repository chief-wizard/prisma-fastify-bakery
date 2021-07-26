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

    fastify.post('/duty', async(req, res) => {
        let taskExisits = req.body;
        let record = await duty.findUnique({
            select: {
                id: true,
                task: true,
                stuff: true
            },
            where: taskExisits
        })
        res.send(record)
    })
    
    fastify.post('/duty/add', async(req, res) => {
        let query = req.body;
        let message = "Entry already exist"
        let record = await duty.findUnique({
            select: {
                id: true,
            },
            where: query
        })
 
        if (record){
            res.code(400).send({message: 'record already exists'})
        } 
        
        let newTask = await duty.create({data: query})
        res.send(newTask)        
    })
}
    
module.exports = routes