// This file demonstrates retrieving all records for a model/table from a database using Prisma

// @ts-check

const { PrismaClient } = require("@prisma/client");
const { supplier } = new PrismaClient();

/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Route for retrieving a list of all suppliers
    fastify.get('/supplier', async (req, res) => {

        // Retrieve all suppliers using findMany()
        let list = await supplier.findMany();

        // Send the response
        res.send(list);

    });
}

module.exports = routes;