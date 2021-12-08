// This file demonstrates CRUD (Create, Update, Delete) queries with Prisma via Fastify

// @ts-check

const { PrismaClient } = require("@prisma/client");
const { ingredient } = new PrismaClient();

/**
 * Returns the Fastify Routes made available in this file
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {

    // Route to return all ingredients
    fastify.get('/ingredients', async (req, res) => {

        // Retrieve all ingredients using findMany()
        let list = await ingredient.findMany();

        // Send the response
        res.send(list);

    });

    // Route to return only vegan ingredients
    fastify.get('/veganIngredients', async (req, res) => {

        // Retrieve only vegan ingredients using a 'where' filter
        let list = await ingredient.findMany({
            where:{
                vegan: true
            }
        });

        res.send(list);

    });

    // Route to create a new ingredient
    fastify.post('/ingredients', async (req, res) => {

        // Assign the values from the POST request body to a new ingredient
        let addIngredient = req.body;

        // Check if the ingredient already exists by seeing if one with the same name is already present
        let ingredientExists = await ingredient.findUnique({
            where: {
                name: addIngredient.name
            }
        });

        //If the ingredient does not exist, use Prisma to create it
        if (!ingredientExists) {
            
            let newIngredient = await ingredient.create({
                data: addIngredient
            });

            res.send(newIngredient);

        } else {

        // The ingredient already exists - return an error with a message
        res.code(400).send({ message: 'Ingredient already exists' });

        }

    });

    // Route to update an existing ingredient
    fastify.put('/ingredients/:ingredientId', async (req, res) => {

        // Retrieve the id of the ingredient to be updated from the request URL parameters
        let ingredientId = parseInt(req.params.ingredientId);

        // Retrieve the ingredient fields from the request body
        let { name, type, allergen, vegan, vegetarian, products } = req.body;

        // Update the existing ingredient in the database by updating records where the id matches
        let updatedIngredient = await ingredient.update({
            where: {
                id: ingredientId
            },
            data: {
                name: name != null ? name : undefined,
                allergen: allergen != null ? allergen : undefined,
                vegan: vegan != null ? vegan : undefined,
                vegetarian: vegetarian != null ? vegetarian : undefined,
                products: products != null ? products : undefined,
            }
        });

        res.send(updatedIngredient);

    });

    // Route to delete an ingredient from the database
    fastify.delete('/ingredients/:ingredientId', async (req, res) => {

        // Retrieve the id of the ingredient to be updated from the request URL parameters
        let ingredientId = parseInt(req.params.ingredientId);

        // Delete ingredient where the ID matches
        let deletedIngredient = await ingredient.delete({
            where: {
                id: ingredientId
            }
        });
        
        res.send(deletedIngredient);

    });

}

module.exports = routes;
