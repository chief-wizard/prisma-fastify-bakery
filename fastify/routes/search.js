// @ts-check
const { PrismaClient } = require("@prisma/client");
const { product } = new PrismaClient();

async function routes (fastify, options) {

    fastify.get('/search/products/:query/:page/:count', async (req, res) => {
        
        let { query, page, count } = req.params;
        
        page = (parseInt(page) - 1) ?? 0;
        count = parseInt(count) ?? 5;

        const list = await product.findMany({
            skip: (page * count), 
            take: count,
            where: {
                OR:[
                    {
                        name: {
                            contains: query
                        }
                    },
                    {
                        ingredients: {
                            some:{
                                name: {
                                    contains: query,
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
