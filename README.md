# API Template

This is a basic template for setting up an API.

# Connecting your project to the database

You'll need to add a `.env` file with the following variables:

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_SCHEMA

# Routing

This project uses the Route, Service, Source model.

Within the `src/api` folder, you can add folders to separate your api objects. Within each object, if applicable, there should be a `router.js`, `service.js`, and `source.js` file along with a test folder.

This project will automatically read all routes from the `src/api/*/router.js` files.

## Handling Data

All sql and database handling should be done in the `source` files and should be limited to only sql calls if possible.

The logic of the api should be handled in the `service` files. Service files fetch data from the sources, manipulate them, then forward the data to the router.

The `router` files should only handle which service functions to call and is the only point the front end of the application connects to the backend.

Different routers and services can share resources, but sources should stay relatively contained.
