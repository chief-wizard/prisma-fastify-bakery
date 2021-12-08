// This file demonstrates finding records based on Prisma filter criteria

// @ts-check

const { PrismaClient } = require("@prisma/client");
const { duty } = new PrismaClient();

/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Route to list all duties
    fastify.get('/duties', async (req, res) => {

        // Retrieve all duty records from Prisma
        let list = await duty.findMany();

        // Send the response
        res.send(list);

    });

    // Route to retrieve a single duty by ID
    fastify.get('/duties/:dutyId', async (req, res) => {

        // Extract the dutyId from the request parameters
        let dutyId = parseInt(req.params.dutyId);

        // Retrieve single duty by unique ID
        let list = await duty.findUnique({
            where: {
                id: dutyId
            },
            include:{
                employee: true
            }
        });

        res.send(list);

    });

    // Route to find duties by task name which are incomplete
    fastify.get('/duties/task/:taskName', async (req, res) => {

        // Retrieve the task name to search from the request
        let taskName = req.params.taskName;

        // Find duties with a matching task which are not complete
        let list = await duty.findMany({
            where: {
                task: taskName,
                completed: false
            }
        });

        res.send(list);
    });

}

module.exports = routes;