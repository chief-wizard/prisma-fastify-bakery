// This file demonstrates Pagination and search in Prisma

// @ts-check

const { PrismaClient } = require("@prisma/client");
const { supplier, product } = new PrismaClient();

/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Route to search suppliers with pagination
    fastify.get('/search/suppliers/:searchString/:page/:count', async (req, res) => {

        // Extract the search parameters from the request
        let { searchString, page, count } = req.params;

        // Convert string request parameters to integers, and override their value with sensible defaults if they are negative
        page = (parseInt(page) - 1) ?? 0; // Pages should be zero-indexed and start counting at 0 - otherwise the first page of results will always be skipped
        count = parseInt(count) ?? 5; // our “pages” have 5 records by default

        // Get the list of results by building a Prisma query
        let list = await supplier.findMany({
            skip: (page * count), // Skip/offset is the number of records to skip - the current page multiplied by the number of items on each page
            take: count, // Take/limit is the number of items on a page, the count
            where: {
                name: {
                    contains: searchString // Filter the results to those where the name contains the search string

                }
            },
            include: {
                ingredients: true // include the related records from the ingredients table in the results
            }
        });

        // Send the response
        res.send(list);

    });

    // Route to search products and ingredients with pagination
    fastify.get('/search/products/:searchString/:page/:count', async (req, res) => {

        let { searchString, page, count } = req.params;

        page = (parseInt(page) - 1) ?? 0;
        count = parseInt(count) ?? 5;

        let list = await product.findMany({
            skip: (page * count),
            take: count,
            where: {
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        ingredients: {
                            some: {
                                name: {
                                    contains: searchString,
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                ingredients: true
            }
        });

        res.send(list);

    });

    // You can follow the template of the route above to add more search end points, e.g. /search/employee or /search/supplier

}

module.exports = routes;
