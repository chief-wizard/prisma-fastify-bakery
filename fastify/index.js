const fastify = require('fastify')
const path = require('path')
const autoload = require('fastify-autoload')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = fastify({ logger: true })

// 
app.register(autoload,{
  dir: path.join(__dirname, 'routes')
  })

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`))