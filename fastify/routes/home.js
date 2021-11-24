// @ts-check

async function routes (fastify, options) {

    fastify.get('/', async (req, res) => {

        res.send({ok: true})

    })

}
    
module.exports = routes
