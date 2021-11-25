# Bakery App with Prisma and Fastify

A sample app for managing a bakery with [Prisma](https://www.prisma.io)
and [Fastify](https://www.fastify.io).

## Database setup

A SQLite database is used and will be created in the `prisma` subdirectory when the schema is first migrated.

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

Search for products or products with ingredients' name matching query: `/search/products/:query/:page/:count`

## Paginated search API endpoint example

Searching for products, or products with ingredients containing the string 'choc' (page 1, 3 results per page): 

http://localhost:3000/search/products/choc/1/3

Searching for products, or products with ingredients containing the string 'chocolate muffin' (page 1, 3 results per page): 

http://localhost:3000/search/products/chocolate%20muffin/1/3

Results JSON format will match that returned from the `/products` route.