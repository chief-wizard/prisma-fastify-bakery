// @ts-check
const { PrismaClient } = require("@prisma/client");
const { supplier, product } = new PrismaClient();

async function routes (fastify, options) {

    fastify.get('/search/suppliers/:searchString/:page/:count', async (req, res) => {
        
        let { searchString, page, count } = req.params;
        
        page = (parseInt(page) - 1) ?? 0;
        count = parseInt(count) ?? 5;

        const list = await supplier.findMany({
            skip: (page * count), 
            take: count,
            where: {
                    name: {
                        contains: searchString
                    }
            },
            include: {
                ingredients: true
            }
        });

        res.send(list);
        
    });

    fastify.get('/search/products/:searchString/:page/:count', async (req, res) => {
        
        let { searchString, page, count } = req.params;
        
        page = (parseInt(page) - 1) ?? 0;
        count = parseInt(count) ?? 5;

        const list = await product.findMany({
            skip: (page * count), 
            take: count,
            where: {
                OR:[
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        ingredients: {
                            some:{
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
