# Shopping List Manager Microservice
Author: Emily Michaud 

## Overview
The Shopping List Manager is a service that coordinates creation, inserts, updates, deletes, and retrievals from the Shopping List MongoDB collection. The Shopping List microservice maintains the MongoDB ShoppingLists collection and supports the following operations with 7 HTTP REST API endpoints:

1. Create a new shopping list with a shopping list name for a particular associated with user ID
2. Get all shopping lists from ShoppingLists collection for a particular user associated with user ID
3. Get a single shopping list for a particular user from ShoppingLists collection by shopping list ID and user ID
4. Add a new ingredient to one of user's shopping lists associated with shopping list ID and user ID
5. Delete an ingredient from one of user's shopping lists associated with shopping list ID, user ID, and ingredient ID
6. Update an ingredient's information in one of user's shopping lists associated with shopping list ID, user ID, and ingredient ID
7. Delete one of user's shopping lists associated with shopping list ID and user ID

## Configuration

**These variables must be set on your system in the provided .env folder**

The Shopping List Manager reads the following environment variables:
* MONGO_DATABASE: Name of the Shopping List database `default: Shopping_Lists`
* MONGO_INITDB_USERNAME: Username to connect to the Shopping List database with `default: ShoppingListDB`
* MONGO_INITDB_PASSWORD: Password to connect to the Shopping List database with `default: ShoppingListDB`
* MONGO_PORT: Port Shopping List database is listening on `default: 27017 -> this port must be the default value unless you change the mongo service port in the docker compose file`
* SHOPPING_LIST_API_PORT: Internal port Shopping List API is listening on `default: 8080`

The Shopping List MongoDB Service reads the following environment variables:
* MONGO_INITDB_ROOT_USERNAME: MongDB root admin username `default: admin`
* MONGO_INITDB_ROOT_PASSWORD: MongDB root admin password `default: admin`
* MONGO_DATABASE: Name of the Shopping List database `default: Shopping_Lists`
* MONGO_INITDB_USERNAME: Username to connect to the Shopping List database with `default: ShoppingListDB`
* MONGO_INITDB_PASSWORD: Password to connect to the Shopping List database with `default: ShoppingListDB`

## How to Run

1. `cd` to the shopping list service base directory folder
2. Make sure the .env file contains all necessary env variables
3. run `docker-compose up` to start the Shopping List API service and MongoDB service
4. To connect to the API using HTTP requests, look at which port in the range 9040-9049 the service is running on by running `docker-compose ps` and looking at the first port listed

## Files

The Shopping List Manager includes many files with distinct purposes.

### Shopping List API

Runs the express server for the Shopping List microservice REST API. The Shopping List API provides many endpoints that respond to each of the HTTP request methods (GET/POST/PUT/DELETE) in order to perform many CRUD operation requests. The Shopping List API supports 7 HTTP REST API endpoints explained below under the Shoppig List HTTP REST API Endpoints header.

### CRUD Operations

Performs all the CRUD operations to create, get, update, or delete entries from the MongoDB Shopping List collection.

### Shopping List Models

Defines all the interface models for the Shopping List collection and defines the format of HTTP requests JSON bodies that are sent to the create, update, and filter endpoints. This file also defines the schema for the Shopping List collection and the Ingredients List sub-collection within the Shopping List collection used to store the Shopping List's list of ingredients. The schema for the Shopping List collection and its contained sub-collection are shown below under the Shopping Lists Collection Schema header. (this information can also be found in the `src/models/shoppingListModels.ts` file):


## Shopping List Collection Schema
```typescript
// Shopping list table schema
ShoppingListSchema {
    _id: {type: ObjectID}
    user_id: { type: String, required: true},
    date_created: {type: Date},
    shopping_list_name: {type: String},
    ingredient_list: [IngredientsSchema]
}

// Shopping list ingredients list sub document schema
IngredientsSchema {
    _id: {type: ObjectID}
    ingredient_name: {type: String, required: true},
    ingredient_measurement: {
        measurement_amount: {type: Number},
        measurement_unit: {type: String},
    },
    ingredient_extra: {type: Boolean}, // Optional field: specifies if the ingredient is an optional or necessary ingredient
    recipe_id: {type: String} // Optional field: holds ID of a recipe that the ingredient is being used for
}
```

## Shopping List Create Shopping List Endpoint Request Body Format

```typescript
	"user_id": string, // ID of user
    "shopping_list_name": string, // Name of new shopping list
}

```

## Shopping List Add Ingredient Endpoint Request Body Format

```typescript
	"id": string, // ID of shopping list to add ingredient to
    "ingredient_name": string, // Name of ingredient to add to shopping list
    "amount": number, // Amount of ingredient to add to shopping list
    "units": string, // Units describing the amount of ingredient 
    "recipe_id": string, // Optional field: holds ID of a recipe that the ingredient is being used for
    "ingredient_extra": boolean // Optional field: specifies if the ingredient is an optional or necessary ingredient
```

## Shopping List Update Ingredient Endpoint Request Body Format

```typescript
    "user_id": string // ID of user
    "id": string, // ID of Shopping List
    "ingredient_id": string, // ID of ingredient to update
	"amount": number, // If included in request, contains the amount to update the ingredient amount with
	"units": string, // If included in request, contains the units to update the ingredient units with
	"recipe_id": string, // If included in request, contains the recipe id to update the ingredient recipe id with
    "ingredient_extra": boolean // If included in request, contains true/false to update the ingredient_extra boolean with
    }
```

## Shopping List HTTP REST API Endpoints List
1. `/api/shoppinglist/create_shopping_list` : Create a new shopping list for a user
2. `/api/shoppinglist/get_shopping_lists_by_userid` : Get all shopping lists for a user
3. `/api/shoppinglist/get_shopping_list_by_id` : Get shopping list for a user by shopping list's ID
4. `/api/shoppinglist/add_to_shopping_list` : Add new ingredient to shopping list
5. `/api/shoppinglist/delete_from_shopping_list` : Delete ingredient from shopping list
6. `/api/shoppinglist/delete_shopping_list` : Delete a user's shopping list
7. `/api/shoppinglist/update_shopping_list_ingredient` : Update an ingredient in one of user's shopping list


## Shopping List HTTP REST API Endpoints Examples

### (POST) `/api/shoppinglist/create_shopping_list`: Create a new shopping list for a user:

Example request:

```
http://localhost:9040/api/shoppinglist/create_shopping_list
```

Example Request Body:

```json
{
	"user_id": "607afe2a2b036c002e4c42a8",
    "shopping_list_name": "My Second Shopping List"
}

```

Example response:

```json
{
    "message": "Created new shopping list for user",
    "shoppingList": {
        "_id": "607b3f85b3fd93002dbf5704",
        "user_id": "607afe2a2b036c002e4c42a8",
        "shopping_list_name": "My Second Shopping List",
        "date_created": "2021-04-17T20:05:25.915Z",
        "ingredient_list": [],
        "__v": 0
    }
}
```

### (GET) `/api/shoppinglist/get_shopping_lists_by_userid`: return a list of user's shopping lists:

Example request:

```
http://localhost:9040/api/shoppinglist/get_shopping_lists_by_userid?user_id=607afe2a2b036c002e4c42a8
```

Example response:

```json
{
    "count": 2,
    "shoppingList": [
        {
            "_id": "607b3eecb3fd93002dbf5703",
            "user_id": "607afe2a2b036c002e4c42a8",
            "shopping_list_name": "My First Shopping List",
            "date_created": "2021-04-17T20:02:52.107Z",
            "ingredient_list": [
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "jar"
                    },
                    "_id": "607b4117b3fd93002dbf5705",
                    "ingredient_name": "peanut butter",
                    "ingredient_extra": false
                }
            ],
            "__v": 0
        },
        {
            "_id": "607b3f85b3fd93002dbf5704",
            "user_id": "607afe2a2b036c002e4c42a8",
            "shopping_list_name": "My Second Shopping List",
            "date_created": "2021-04-17T20:05:25.915Z",
            "ingredient_list": [],
            "__v": 0
        }
    ]
}
```

### (GET) `/api/shoppinglist/get_shopping_lists_by_id`: return a shopping list of user using shopping list ID

Example request:

```
http://localhost:9040/api/shoppinglist/get_shopping_list_by_id?user_id=607afe2a2b036c002e4c42a8&id=607b3eecb3fd93002dbf5703
```

Example response:

```json
{
    "count": 1,
    "shoppingList": {
        "_id": "607b3eecb3fd93002dbf5703",
        "user_id": "607afe2a2b036c002e4c42a8",
        "shopping_list_name": "My First Shopping List",
        "date_created": "2021-04-17T20:02:52.107Z",
        "ingredient_list": [
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "jar"
                },
                "_id": "607b4117b3fd93002dbf5705",
                "ingredient_name": "peanut butter",
                "ingredient_extra": false
            }
        ],
        "__v": 0
    }
}
```

### (POST) `/api/shoppinglist/add_to_shopping_list`: add a new ingredient to a user's shopping list

Example request:

```
http://localhost:9040/api/shoppinglist/add_to_shopping_list
```
Example Request body:
```json
{
	"id": "607b3eecb3fd93002dbf5703",
    "ingredient_name": "jelly",
    "user_id": "607afe2a2b036c002e4c42a8",
    "amount": 1, 
    "units": "bottle",
    "ingredient_extra": false,
    "recipe_id": "908a41d7brfd53402dds5415"
}
```

Example response:

```json
{
    "count": 2,
    "shoppingList": {
        "_id": "607b3eecb3fd93002dbf5703",
        "user_id": "607afe2a2b036c002e4c42a8",
        "shopping_list_name": "My First Shopping List",
        "date_created": "2021-04-17T20:02:52.107Z",
        "ingredient_list": [
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "jar"
                },
                "_id": "607b4117b3fd93002dbf5705",
                "ingredient_name": "peanut butter",
                "ingredient_extra": false
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "bottle"
                },
                "_id": "607b55bab3fd93002dbf5708",
                "ingredient_name": "jelly",
                "recipe_id": "908a41d7brfd53402dds5415",
                "ingredient_extra": false
            }
        ],
        "__v": 0
    }
}
```

### (PUT) `/api/shoppinglist/update_shopping_list_ingredient`: Create a new shopping list for a user:

Example request:

```
http://localhost:9040/api/shoppinglist/update_shopping_list_ingredient
```

Example Request Body:

```json
{
    "id": "607b3eecb3fd93002dbf5703",
	"user_id": "607afe2a2b036c002e4c42a8",
    "ingredient_id": "607b4117b3fd93002dbf5705", 
    "amount": 5, 
    "units": "jars",
    "ingredient_extra": true,
    "recipe_id": "908a41d7brfd53402dds5415"
}

```

Example response:

```json
{
    "count": 2,
    "shoppingList": {
        "_id": "607b3eecb3fd93002dbf5703",
        "user_id": "607afe2a2b036c002e4c42a8",
        "shopping_list_name": "My First Shopping List",
        "date_created": "2021-04-17T20:02:52.107Z",
        "ingredient_list": [
            {
                "ingredient_measurement": {
                    "measurement_amount": 5,
                    "measurement_unit": "jars"
                },
                "_id": "607b4117b3fd93002dbf5705",
                "ingredient_name": "peanut butter",
                "ingredient_extra": true,
                "recipe_id": "908a41d7brfd53402dds5415"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "bottle"
                },
                "_id": "607b55bab3fd93002dbf5708",
                "ingredient_name": "jelly",
                "recipe_id": "908a41d7brfd53402dds5415",
                "ingredient_extra": false
            }
        ],
        "__v": 0
    }
}
```

### (DELETE) `/api/shoppinglist/delete_from_shopping_list`: return a shopping list of user using shopping list ID

Example request:

```
http://localhost:9040/api/shoppinglist/delete_from_shopping_list?user_id=607afe2a2b036c002e4c42a8&ingredient_id=607b53a2b3fd93002dbf5707&id=607b3eecb3fd93002dbf5703
```

Example response:

```json
{
    "count": 1,
    "shoppingList": {
        "_id": "607b3eecb3fd93002dbf5703",
        "user_id": "607afe2a2b036c002e4c42a8",
        "shopping_list_name": "My First Shopping List",
        "date_created": "2021-04-17T20:02:52.107Z",
        "ingredient_list": [
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "jar"
                },
                "_id": "607b4117b3fd93002dbf5705",
                "ingredient_name": "peanut butter",
                "ingredient_extra": false
            }
        ],
        "__v": 0
    }
}
```

### (DELETE) `/api/shoppinglist/delete_shopping_list`: return a shopping list of user using shopping list ID

Example request:

```
http://localhost:9040/api/shoppinglist/delete_shopping_list?id=607b3f85b3fd93002dbf5704&user_id=607afe2a2b036c002e4c42a8
```

Example response:

```json
{
    "message": "Successfully Deleted Shopping List"
}
```
