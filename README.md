# Bakery App with Prisma and Fastify

A sample app for managing a bakery with [Prisma](https://www.prisma.io)
and [Fastify](https://www.fastify.io).

## Database setup

A SQLite database is used and will be created in the `prisma` subdirectory when the schema is first migrated.

## Installation

This code has been tested with Node.js version 14.

To install the application, clone this repository and run:

	npm install

Then, duplicate the configuration file `.env.example` to `.env`:

    cp .env.example .env

## Type checking in VSCode

I recommend using type Visual Studio Code with this repository.  You'll see the 

	// @ts-check

Comment at the beginning of some files - this enables type checking and will help you to make sure your Prisma models and types are used correctly.

## Running the app

1. Build the database schema:

		npx prisma migrate dev --name init

2. Generate the Prisma client:

        npx prisma generate

3.  Test the Prisma database connection - this will create a test product in the database if successful:

        node index.js
    
4. Start Prisma Studio:

		npx prisma studio
		
5. Run the server in development mode:

		npm run dev

## Set up autoloading for the app’s components

If you’d like your development environment to automatically load all plugins from the plugins directory, check out [`fastify-autoload`](https://github.com/fastify/fastify-autoload).

## REST API endpoints that the app exposes

The following API routes are created in Prisma objects.  Each object has routes demonstrating different Prisma features - check out the files in the `fastify/routes` directory to see what endpoints exist and what they do.

Base URL: `http://localhost:3000`

Duties: `/duties`

Products: `/products`

Ingredients: `/ingredients`

Sales: `/sales`

Employees: `/employees`

Suppliers: `/supplier`

*Note that not all Prisma objects have a full CRUD endpoint, depending on what is being demonstrated.  If they do not, run `npx prisma studio` to launch the Prisma Studio which will allow you to add and edit records.*

## REST API endpoint example

Products w/ ingredients returned from `/products`:

	[
		{
			"id": 1,
			"name": "Chocolate Muffin",
			"type": "",
			"category_id": null,
			"price": "1",
			"ingredients": [
				{
					"id": 1,
					"name": "Chocolate",
					"allergen": false,
					"vegan": true,
					"vegetarian": true
				}
			]
		}
	]

## Paginated search API endpoints the app exposes

Search for products or products with ingredients' name matching a searched string: `/search/products/:searchString/:page/:count`

## Paginated search API endpoint example

Searching for suppliers by name:

`/search/suppliers/:searchString/:page/:count`

Searching for suppliers with name containing the string 'shop' (page 1, 3 results per page): 

`/search/suppliers/shop/1/3`

Searching for products, or products with ingredients containing the string 'choc' (page 1, 3 results per page): 

`/search/products/choc/1/3`

Searching for products, or products with ingredients containing the string 'chocolate muffin' (page 1, 3 results per page): 

`/search/products/chocolate%20muffin/1/3`

Results JSON format will match that returned from the `/products` route.

## Code comments / documentation

This repository is commented, but not every function is.

If a function which performs the same or similar task (but with a different object) exists in another file or earlier in the same file, the comment will likely only appear once to avoid repetition.

For example, if functions to create a record in Prisma exist in two different files, only one may be commented.

If something doesn't look like it has an explanation, have a hunt around and you should find one in an adjacent file :)

The comments include the intent of the function.  Explanation of the Prisma functions and query syntax can be found at https://www.prisma.io/docs/ (where it's always up-to-date)