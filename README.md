# prisma-fastify-bakery

# Fastify server that automatically loads in all plugins from the plugins directory:
https://github.com/fastify/fastify-autoload

# build new schema
npx prisma migrate dev --name init

# start studio
npx prisma studio

# run server
npm run dev

# rest api calls
http://localhost:3000/duty
http://localhost:3000/goods
http://localhost:3000/ingridients
http://localhost:3000/sales
http://localhost:3000/stuff
http://localhost:3000/supplier