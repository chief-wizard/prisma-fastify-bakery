// This file demonstrates retrieving all records for a model/table from a database using Prisma, limiting the columns returned with a SELECT statement

// @ts-check

const { PrismaClient } = require("@prisma/client");
const { employee } = new PrismaClient();

/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Route to retrieve all employees
    fastify.get('/employees', async (req, res) => {

        // Retrieve all employees using findMany()
        // A select clause is added so that only specified columns is returned (The employee lastName field is omitted, in this case)
        let list = await employee.findMany({
            select: {
                id: true,
                firstName: true,
                role: true,
                duties: true
            }
        });

        // Send the response
        res.send(list);

    });

}

module.exports = routes;