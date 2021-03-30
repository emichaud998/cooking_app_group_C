# Recipes Microservice Exemplar
Author: Emily Michaud 

## Overview
This Exemplar shows how to communicate with each of the Recipes Microservice endpoints. The Recipes Microservice coordinates inserts, updates, deletes, and retrievals from the Recipes MongoDB collection and supports the following operations with 10 HTTP REST API endpoints which are all shown in this exemplar:

1. Create new recipe
2. Get list of all recipe information from Recipes collection. Can limit this list or skip over entries.
3. Get a single recipe's information from Recipes collection by Recipe ID 
4. Gets a list of all the distinct ingredients in DB
5. Gets information for one or many recipes whose name contains request name
6. Update a recipe entry information associated with either an ID or exact name
7. Delete a recipe entry associated with either an ID or exact name from Recipes collection
8. Filter Recipes by one or more of the following (can limit this filtered list or skip over entries):
    * Filter all recipes that includes at least one requested ingredient from list
    * Filter all recipes that only include requested ingredients from list
    * Filter all recipes that do not include any requested ingredients from list
    * Filter all recipes by dietary category
    * Filter all recipes by meal type 

## How to Run

1. `cd` to the recipe microservice exemplar base directory folder
2. run `npm install`
3. Open another terminal and `cd` to the recipe service base directory folder
    4. run `npm install`
    5. run `npm start` in the recipe service base directory to start up the recipe microservice
6. run `npm start` in the recipe microservice exemplar base directory to run the exemplar code which shows how to send and retrieve data to/from each of the Recipes Microservice endpoints.

## Files

The Recipes Microservice exemplar includes two files with distinct purposes.

### Recipes Interfaces

Defines all the interface models that are used to send recipe data in the POST and PUT request bodies that are supplied to the Recipe Microservice's create, update, and filter endpoints. This file defines the JSON formats that are used by the exemplar for creating new recipes, filtering recipes, and updating recipes by sending these requests to the Recipe Microservice.

### Recipe Service Connect

This file shows how to send/retrieve data from each of the Recipe Microservice endpoints. There are multiple functions used to show how to create a new recipe and send the recipe to the Recipe Microservice create_recipe endpoint, how to get one or many recipes from the Recipe Microservice, how to recieve a filtered list from the Recipe Microservice, how to update recipes stored in the Recipe Microservice DB, and how to delete recipes from the Recipe Microservice DB. This file uses `axios` to send requests to each of the Recipe Microservice endpoints.

## Recipe Interfaces Used by Exemplar

### Create Endpoint Request Body Format
```typescript
    {
        "name": string, 
        "description": string, 
        "prep_time": number, 
        "cook_time": number, 
        "servings": number, 
        "calories": number, 
        "yield_amount": number, 
        "yield_unit": string, 
        "meal_type": string[], // All passed in meal_types will be set to true, setting all others to false
        "dietary_categories": string[], // All passed in dietary_categories will be set to true, setting all others to false
        "dish_type": string, 
        "ingredients": [{
            "ingredient_name": string, 
            "measurement_amount": number, 
            "measurement_unit": string, 
            "ingredient_type": string}],
        "ingredients_extra": [{ // Any extra non-necessary ingredients- omitted if no extra ingredients
            "ingredient_name": string, 
            "measurement_amount": number, 
            "measurement_unit": string, 
            "ingredient_type": string}],
        "recipe_steps": string[]
    }
```

### Update Endpoint Request Body Format

```typescript
    "id": string, // id for update by id endpoint
    "name": string, // name for update by name endpoint
    "updates": { // all below fields optional, if you do not want to update a field, omit field from request
        "name": string, 
        "description": string, 
        "prep_time": number, 
        "cook_time": number, 
        "servings": number, 
        "calories": number, 
        "yield_amount": number, 
        "yield_unit": string, 
        "meal_type": string[], // All passed in meal_types will be set to true, setting all others to false
        "dietary_categories": string[], // All passed in dietary_categories will be set to true, setting all others to false
        "dish_type": string, 
        "ingredients": [{ // Replaces old ingredients list with new ingredients list
            "ingredient_name": string, 
            "measurement_amount": number, 
            "measurement_unit": string, 
            "ingredient_type": string}],
        "ingredients_extra": [{ // Replaces old ingredients extra list with new ingredients list
            "ingredient_name": string, 
            "measurement_amount": number, 
            "measurement_unit": string, 
            "ingredient_type": string}],
        "recipe_steps": string[] // Replaces old recipe_steps array with new recipe_steps array
    }
```

### Filter Endpoint Request Body Format

```typescript
    "filter_category": string[], // Find recipes who has these listed categories set to true
    "filter_meal_type": string[], // Find recipes who has one of these listed meal types set to true
	"filter_ingredient_contains": string[], // Find recipes who contain at least one of these listed ingredients
	"filter_ingredient_only": string[], // Find recipes who contain all of these listed ingredients
	"filter_ingredient_exclude": string[] // Find recipes who do not contain any of these listed ingredients
```

## Recipes HTTP REST API Endpoints List Used by this Exemplar
1. `/api/recipes/get_recipes` : Get list of all recipes and their information
2. `/api/recipes/get_ingredients_list` : Get list of all unique ingredient names from all recipes
3. `/api/recipes/get_recipe_by_id` : Get recipe information for a particular recipe using its ID
4. `/api/recipes/get_recipes_by_name` : Get recipe information for one or more recipes that contain the supplied name in their recipe name
5. `/api/recipes/create_recipe` : Create a new recipe
6. `/api/recipes/filter_recipes` : Filter recipes by meal type, dietary preferences, and ingredients
7. `/api/recipes/update_recipe_by_id` : Update a particular recipe using its ID
8. `/api/recipes/update_recipe_by_name` : Update a particular recipe using its EXACT name
9. `/api/recipes/delete_recipe_by_id` : Delete a particular recipe using its ID
10. `/api/recipes/delete_recipe_by_name` : Delete a particular recipe using its EXACT name

## Why is this Useful?
This exemplar is very useful to show the basic structure that all team members should follow when communicating with the Recipe Microservice. Since the Recipe Microservice maintains all the recipe and ingredient information, it will most likely be the most frequently used service in our Recipe Application. Therefore, it is important that each team member understands each of the endpoints that the Recipe Microservice provides and how to send/retrieve data from each of these endpoints. 
