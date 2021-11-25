# Bakery App with Prisma and Fastify

A sample app for managing a bakery with [Prisma](https://www.prisma.io)
and [Fastify](https://www.fastify.io).

## Database setup

A SQLite database is used and will be created in the `prisma` subdirectory when the schema is first migrated.

## Installation

This code has been tested with Node.js version 14.

To install the application, clone this repository and run:

	npm install

## Type checking in VSCode

I recommend using type Visual Studio Code with this repository.  You'll see the 

	// @ts-check

Comment at the beginning of some files - this enables type checking and will help you to make sure your Prisma models and types are used correctly.

## Running the app

1. Build the database schema:

		npx prisma migrate dev --name init
    
2. Start Prisma Studio:

		npx prisma studio
		
3. Run the server in development mode:

		npm run dev

## Set up autoloading for the app’s components

If you’d like your development environment to automatically load all plugins from the plugins directory, check out [`fastify-autoload`](https://github.com/fastify/fastify-autoload).

## REST API endpoints that the app exposes

Base URL: `http://localhost:3000`

Duties: `/duty`
Products: `/products`
Ingredients: `/ingredients`
Sales: `/sales`
Employees: `/employees`
Suppliers: `/supplier`

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