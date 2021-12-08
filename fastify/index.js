// This file contains the code which launches the Fastify web server and loads the Prisma routes into it

const fastify = require('fastify');
const path = require('path');
const autoload = require('fastify-autoload');

// Create an instance of the Fastify web server with logging enabled 
const app = fastify({ logger: true });

// When routes are added, print a summary to the console
app.addHook('onRoute', (routeOptions) => {

    console.log('Route loaded: ' + routeOptions.path + ' - ' + routeOptions.method);

});

// Register the API routes defined in the 'routes' directory with Fastify
app.register(autoload, {
    dir: path.join(__dirname, 'routes')
});

// Start the Fastify web server on port 3000, showing a 'ready' message when it has successfully launched
const server = app.listen(3000, () =>
    console.log(`🚀 Server ready at: http://localhost:3000`));