// This file demonstrates retrieving all records for a model/table from a database using Prisma

// @ts-check

const { PrismaClient } = require("@prisma/client");
const { sale } = new PrismaClient();

/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Route for retrieving all sales
    fastify.get('/sales', async (req, res) => {

        // Retrieve all sales using findMany()
        let list = await sale.findMany();

        // Send the response
        res.send(list);

    });

}

module.exports = routes;