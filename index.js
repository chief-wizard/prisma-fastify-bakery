// This file is used to test the Prisma connection from the command line and is not related to Fastify or the operation of the API

// @ts-check

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Function to test Prisma functionality by creating a new product in the database
 */
async function main() {
    let newProduct = await prisma.product.create({
        data: {
            name: 'Test Product',
            price: 0.01,
        }
    });

    console.log(newProduct);
}

// Run the test function and test any errors
main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect();
    });