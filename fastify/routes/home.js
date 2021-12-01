
/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Default route for the REST API
    fastify.get('/', async (req, res) => {

        // Send the response
        res.send({ ok: true });

    });

}

module.exports = routes;
