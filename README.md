# interview-p1zz4

## Introduction

Greetings and welcome to this programming take home challenge! It is expected that these exercies will take 3 hours or less to complete. If you find yourself taking more time than that feel free to leave some of it uncompleted; it will not count against you. We will review what you have submitted and discuss any roadblocks in the followup interview.
If you have any questions, run into any issues, or need any clarification on anything, please don't hesitate to reach out.

## Requirements

- Latest version of [Docker Desktop](https://www.docker.com/products/docker-desktop).
- You will likely want an API Client application such as [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/).

## Setup

1. Fork this repository to your github account, then clone that fork to your computer.
2. Inside of the `interview-p1zz4` directory and Docker Desktop running, execute `docker-compose build` to build the docker image. Once that is complete execute `docker-compose up -d mysql`, to start the db server.
3. Once the `mysql` docker container is running. Exectue the following commands to setup the database:
   - `docker-compose run --rm pizzapi npm run db:migrate` to run migrations
   - `docker-compose run --rm pizzapi npm run db:seed` to add dummy data to the db.
4. Exectute `docker-compose up -d pizzapi` to start the server. To see the logs for the server's docker container execute: `docker-compose logs -f pizzapi`, or you can find them in the Docker Desktop dashboard.
5. Using a browser or API client make a http GET request to http://localhost:7777. You should see the message `Come get it while it's hot!`.
6. Complete the exercises listed below. Once you are done, submit a PR against your fork and share it with the hiring manager you have been in communication with.
7. Happy Coding!

## Notes

- We are using `nodemon` to run the server in the docker container, so it will restart after you save a file.
- To connect to the DB with MySQL Workbench or other DB tool once the `mysql` instance is running, use the connection url: `mysql://michelangelo:cowabunga@127.0.0.1:7779/pizzadb`.
- The node debugger can be attached to on `localhost:7778`. A configuration for VSCode is already included.

## Exercises

1. Implement `/pizzaOrder/price` request
   - `pizzapi/app.js` line #23
   - Create a rest endpoint that takes a body of shape:
     ```
     {
        "size": <sizeId>,
        "sauce": <sauceId>,
        "toppings": [
           <toppingId1>,
           <toppingId2>,
           ...
        ]
     }
     ```
     and returns the expected price, formatted as a `string` (ex: `'32.20'`), for an expected `PizzaOrder`.
2. Implement `PizzaOrderTopping` model associations
   - `pizzapi/models/index.js` line #13.
   - Define the `PizzaOrderTopping` model associations so that there is a many-to-many relationship between `PizzaOrder` and `Topping`, such that a `PizzaOrder` has one or more `Topping`s, and a `Topping` can be on one or more `PizzaOrder`s. Here is the documentation on sequelize model associations for reference: https://sequelize.org/master/manual/assocs.html
   - Note: We reccomend overwritting the pluralization definitions on associations: https://sequelize.org/master/manual/naming-strategies.html#overriding-singulars-and-plurals-when-defining-aliases
   - This allows us to use the `PizzaOrder.getToppings` and `PizzaOrder.setToppings` methods.
3. Implement `pizzaOrder/create` endpoint
   - `pizzapi/app.js` line #28
   - Create a rest endpoint that takes a body of shape:
     ```
     {
        "email": <myEmail>,
        "size": <sizeId>,
        "sauce": <sauceId>,
        "toppings": [
           <toppingId1>,
           <toppingId2>,
           ...
        ]
     }
     ```
     creates the correct entries in the `PizzaOrder` and `PizzaOrderTopping` tables, and returns the price (formatted as a `string` like `'32.20'`) for the `PizzaOrder`.
4. Implement `customer/favoriteTopping` endpoint
   - `pizzapi/app.js` line #33
   - Create an endpoint that takes a request body of shape:
     ```
     {
        "email": <myEmail>
     }
     ```
     and returns the `Topping` that is associated with the most `PizzaOrder`s with that `email` value.

## Docker Compose Cheat Sheet

- `docker-compose build`: Builds all containers.
- `docker-compose up -d`: Starts all containers in the background.
- `docker-compose up -d <service name>`: Starts a single docker service in the background. Ex: `docker-compose up -d mysql`
- `docker-compose down`: Brings all the containers down.
- `docker-compose stop <service name>`: Stops a single running service.
- `docker-compose logs -f`: Shows all docker logs in follow mode.
- `docker-compose logs -f <service name>`: Shows docker logs for a single service in follow mode. Ex: `docker-compose logs -f gluesvc`
- `docker-compose run -rm <service name> <command>`: Creates a ephemeral container to run a terminal command inside of. Ex: `docker-compose run --rm pizzapi npm run db:migrate`
- `docker-compose top`: Shows active processes in project containers.
- `docker ps`: Shows all running docker containers.

## Gotchas

- You should never run into this, but we found that if we undid all migrations, then we needed to restart the `mysql` container to rerun them. `docker-compose restart mysql`.
