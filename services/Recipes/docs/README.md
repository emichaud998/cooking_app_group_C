# Recipes Manager Microservice

## Overview
The Recipes Manager is a service that coordinates inserts, updates, deletes, and retrievals from the Recipes MongoDB collection. The Recipes microservice maintains the MongoDB Recipes collection and supports the following operations with 10 HTTP REST API endpoints:

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

## Configuration
The FHIR Endpoint Manager reads the following environment variables:

**These variables must be set on your system in the provided .env folder**

As of right now the Recipe microservice connects to MongoDB locally, but this will be updated to work with Docker and environmental variables will be required

## How to Run

1. `cd` to the recipe service base directory folder
2. run `npm install`
3. run `npm start` to start the APIs server

### Recipes Collection Mock Data Population
To populate a mock Recipes MongoDB collection with fake data, run `npm run populateMockDB`. This program will prompt the user to input the number of fake recipes they want to insert into the DB, and then it will create that many fake mock recipes and send each one to the Recipes Microservice's `/create_recipe` endpoint.

## Files

The Recipes Manager includes many files with distinct purposes.

### Recipes API

Runs the express server for the Recipes microservice REST API. The Recipes API provides many endpoints that respond to each of the HTTP request methods (GET/POST/PUT/DELETE) in order to perform many CRUD operation requests. The Recipes API supports 10 HTTP REST API endpoints explained below under the Recipes HTTP REST API Endpoints header.

### CRUD Operations

Performs all the CRUD operations to create, get, update, or delete entries from the MongoDB Recipes collection.

### Recipes Models

Defines all the interface models for the Recipes collection and for the request body JSON formats supplied to the create, update, and filter endpoints. This file also defines the schema for the Recipes collection and the Ingredients and Recipe Steps sub-collections within the Recipes collection. The schema for the Recipes collection and its contained sub-collections are shown below under the Recipes Collection Schema header. (this information can also be found in the `src/models/recipesModels.ts` file):


## Recipes Collection Schema
```typescript
// Recipes table schema
const RecipesSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true},
  description: {type: String},
  prep_time: {type: Number}, // prep time in minutes
  cook_time: {type: Number}, // cook time in minutes
  servings: {type: Number},
  calories: {type: Number},
  yield: {
      yield_amount: {type: Number},
      yield_unit: {type: String}
  },
  meal_type: {
      breakfast: {type: Boolean},
      lunch: {type: Boolean},
      dinner: {type: Boolean},
      appetizer: {type: Boolean},
      side_dish: {type: Boolean},
      snack: {type: Boolean},
      dessert: {type: Boolean}
  },
  dietary_categories: {
      low_sodium: {type: Boolean},
      low_fat: {type: Boolean},
      low_carb: {type: Boolean},
      gluten_free: {type: Boolean},
      dairy_free: {type: Boolean},
      nut_free: {type: Boolean},
      low_sugar: {type: Boolean},
      low_calories: {type: Boolean},
      all_natural: {type: Boolean},
      vegetarian: {type: Boolean},
      vegan: {type: Boolean},
      healthy: {type: Boolean}
  },
  dish_type: {type: String},
  ingredients: [IngredientsSchema],
  recipe_steps: [RecipeStepsSchema]
});

// Recipe ingredients sub document schema
const IngredientsSchema: Schema  = new Schema({
    ingredient_name: {type: String, required: true},
    ingredient_measurement: {
        measurement_amount: {type: Number},
        measurement_unit: {type: String},
    },
    ingredient_type: {type: String},
});

// Recipe steps sub document schema
const RecipeStepsSchema: Schema  = new Schema({
    step_number: {type: Number, required: true},
    step_description: {type: String}
});
```
## Create Endpoint Request Body Format
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
        "recipe_steps": string[]
    }
```

## Update Endpoint Request Body Format

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
        "recipe_steps": string[] // Replaces old recipe_steps array with new recipe_steps array
    }
```

## Filter Endpoint Request Body Format

```typescript
    "filter_category": string[], // Find recipes who has these listed categories set to true
    "filter_meal_type": string[], // Find recipes who has these listed meal types set to true
	"filter_ingredient_contains": string[], // Find recipes who contain at least one of these listed ingredients
	"filter_ingredient_only": string[], // Find recipes who contain all of these listed ingredients
	"filter_ingredient_exclude": string[] // Find recipes who do not contain any of these listed ingredients
```
## Recipes HTTP REST API Endpoints

### (GET) `/get_recipes`: return a list of all recipes- can supply optional limit and skip number:

Example request:

```
http://localhost:8000/get_recipes?limit=3&skip=0
```

Example response:

```json
{
    "count": 3,
    "recipes": [
        {
            "yield": {
                "yield_amount": 10,
                "yield_unit": "waffles"
            },
            "meal_type": {
                "breakfast": true,
                "lunch": true,
                "dinner": false,
                "appetizer": false,
                "side_dish": false,
                "snack": false,
                "dessert": false
            },
            "dietary_categories": {
                "low_sodium": false,
                "low_fat": false,
                "low_carb": false,
                "gluten_free": false,
                "dairy_free": false,
                "nut_free": false,
                "low_sugar": false,
                "low_calories": false,
                "all_natural": false,
                "vegetarian": false,
                "vegan": false,
                "healthy": false
            },
            "_id": "605d61608ef41b2471f31ac3",
            "name": "Classic Waffles",
            "description": "A lovely, crispy waffle perfect for the morning",
            "prep_time": 10,
            "cook_time": 15,
            "servings": 5,
            "calories": 400,
            "dish_type": "waffles",
            "ingredients": [
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d61608ef41b2471f31ac4",
                    "ingredient_name": "flour",
                    "ingredient_type": "baking"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "teaspoons"
                    },
                    "_id": "605d61608ef41b2471f31ac5",
                    "ingredient_name": "salt",
                    "ingredient_type": "seasoning"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 4,
                        "measurement_unit": "teaspoons"
                    },
                    "_id": "605d61608ef41b2471f31ac6",
                    "ingredient_name": "baking powder",
                    "ingredient_type": "baking"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 4,
                        "measurement_unit": "tablespoons"
                    },
                    "_id": "605d61608ef41b2471f31ac7",
                    "ingredient_name": "sugar",
                    "ingredient_type": "sweetener"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2,
                        "measurement_unit": "eggs"
                    },
                    "_id": "605d61608ef41b2471f31ac8",
                    "ingredient_name": "eggs",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1.5,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d61608ef41b2471f31ac9",
                    "ingredient_name": "milk",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.3,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d61608ef41b2471f31aca",
                    "ingredient_name": "butter",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "teaspoon"
                    },
                    "_id": "605d61608ef41b2471f31acb",
                    "ingredient_name": "vanilla extract",
                    "ingredient_type": "sweetener"
                }
            ],
            "recipe_steps": [
                {
                    "_id": "605d61608ef41b2471f31acc",
                    "step_number": 1,
                    "step_description": "In a large bowl, mix together flour, salt, baking powder and sugar; set aside. Preheat waffle iron to desired temperature."
                },
                {
                    "_id": "605d61608ef41b2471f31acd",
                    "step_number": 2,
                    "step_description": "In a separate bowl, beat the eggs. Stir in the milk, butter and vanilla. Pour the milk mixture into the flour mixture; beat until blended."
                },
                {
                    "_id": "605d61608ef41b2471f31ace",
                    "step_number": 3,
                    "step_description": "Ladle the batter into a preheated waffle iron. Cook the waffles until golden and crisp. Serve immediately."
                }
            ],
            "__v": 0
        },
        {
            "yield": {
                "yield_amount": 1,
                "yield_unit": "smoothie bowl"
            },
            "meal_type": {
                "breakfast": true,
                "lunch": false,
                "dinner": false,
                "appetizer": false,
                "side_dish": false,
                "snack": true,
                "dessert": false
            },
            "dietary_categories": {
                "low_sodium": false,
                "low_fat": false,
                "low_carb": false,
                "gluten_free": false,
                "dairy_free": false,
                "nut_free": false,
                "low_sugar": false,
                "low_calories": false,
                "all_natural": false,
                "vegetarian": true,
                "vegan": false,
                "healthy": true
            },
            "_id": "605d639c8ef41b2471f31acf",
            "name": "Blueberry Smoothie Bowl",
            "description": "Quick and easy blueberry smoothie topped with coconut, almonds, and banana.",
            "prep_time": 10,
            "servings": 1,
            "calories": 350,
            "dish_type": "smoothie bowl",
            "ingredients": [
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d639c8ef41b2471f31ad0",
                    "ingredient_name": "blueberries",
                    "ingredient_type": "fruit"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "banana"
                    },
                    "_id": "605d639c8ef41b2471f31ad1",
                    "ingredient_name": "banana",
                    "ingredient_type": "fruit"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2,
                        "measurement_unit": "tablespoons"
                    },
                    "_id": "605d639c8ef41b2471f31ad2",
                    "ingredient_name": "water",
                    "ingredient_type": "water"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "tablespoons"
                    },
                    "_id": "605d639c8ef41b2471f31ad3",
                    "ingredient_name": "cashew butter",
                    "ingredient_type": "nuts"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "teaspoons"
                    },
                    "_id": "605d639c8ef41b2471f31ad4",
                    "ingredient_name": "vanilla extract",
                    "ingredient_type": "sweetener"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "tablespoon (sliced)"
                    },
                    "_id": "605d639c8ef41b2471f31ad5",
                    "ingredient_name": "almonds",
                    "ingredient_type": "nuts"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "tablespoons"
                    },
                    "_id": "605d639c8ef41b2471f31ad6",
                    "ingredient_name": "shredded coconut",
                    "ingredient_type": "nuts"
                }
            ],
            "recipe_steps": [
                {
                    "_id": "605d639c8ef41b2471f31ad7",
                    "step_number": 1,
                    "step_description": "Blend blueberries, 1/2 banana, water, cashew butter, and vanilla extract together in a blender until smooth; pour into a bowl."
                },
                {
                    "_id": "605d639c8ef41b2471f31ad8",
                    "step_number": 2,
                    "step_description": "Top smoothie with sliced banana, almonds, and coconut."
                }
            ],
            "__v": 0
        },
        {
            "yield": {
                "yield_amount": 4,
                "yield_unit": "servings"
            },
            "meal_type": {
                "breakfast": false,
                "lunch": true,
                "dinner": true,
                "appetizer": false,
                "side_dish": false,
                "snack": false,
                "dessert": false
            },
            "dietary_categories": {
                "low_sodium": false,
                "low_fat": false,
                "low_carb": false,
                "gluten_free": false,
                "dairy_free": false,
                "nut_free": false,
                "low_sugar": false,
                "low_calories": false,
                "all_natural": false,
                "vegetarian": false,
                "vegan": false,
                "healthy": false
            },
            "_id": "605d65cb8ef41b2471f31ad9",
            "name": "Homemade Mac and Cheese",
            "description": "This is a nice rich mac and cheese. Serve with a salad for a great meatless dinner. Hope you enjoy it.",
            "prep_time": 20,
            "cook_time": 30,
            "servings": 4,
            "calories": 800,
            "dish_type": "pasta",
            "ingredients": [
                {
                    "ingredient_measurement": {
                        "measurement_amount": 8,
                        "measurement_unit": "ounces"
                    },
                    "_id": "605d65cb8ef41b2471f31ada",
                    "ingredient_name": "elbow macaroni",
                    "ingredient_type": "grains"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31adb",
                    "ingredient_name": "cheddar cheese",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.5,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31adc",
                    "ingredient_name": "parmesan cheese",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 3,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31add",
                    "ingredient_name": "milk",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.25,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31ade",
                    "ingredient_name": "butter",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2.5,
                        "measurement_unit": "tablespoons"
                    },
                    "_id": "605d65cb8ef41b2471f31adf",
                    "ingredient_name": "flour",
                    "ingredient_type": "baking"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.5,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31ae0",
                    "ingredient_name": "bread crumbs",
                    "ingredient_type": "grains"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "pinch"
                    },
                    "_id": "605d65cb8ef41b2471f31ae1",
                    "ingredient_name": "paprika",
                    "ingredient_type": "seasoning"
                }
            ],
            "recipe_steps": [
                {
                    "_id": "605d65cb8ef41b2471f31ae2",
                    "step_number": 1,
                    "step_description": "Cook macaroni according to the package directions. Drain."
                },
                {
                    "_id": "605d65cb8ef41b2471f31ae3",
                    "step_number": 2,
                    "step_description": "In a saucepan, melt butter or margarine over medium heat. Stir in enough flour to make a roux. Add milk to roux slowly, stirring constantly. Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick. Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well."
                },
                {
                    "_id": "605d65cb8ef41b2471f31ae4",
                    "step_number": 3,
                    "step_description": "Melt butter or margarine in a skillet over medium heat. Add breadcrumbs and brown. Spread over the macaroni and cheese to cover. Sprinkle with a little paprika."
                },
                {
                    "_id": "605d65cb8ef41b2471f31ae5",
                    "step_number": 4,
                    "step_description": "Bake at 350 degrees F (175 degrees C) for 30 minutes. Serve."
                }
            ],
            "__v": 0
        }
    ]
}
```

### (GET) `/get_ingredients_list`: get list of all distinct ingredients

Example request:

```
http://localhost:8000/get_ingredients_list
```

Example response:
```json
{
    "count": 19,
    "ingredients": [
        "almonds",
        "baking powder",
        "banana",
        "blueberries",
        "bread crumbs",
        "butter",
        "cashew butter",
        "cheddar cheese",
        "eggs",
        "elbow macaroni",
        "flour",
        "milk",
        "paprika",
        "parmesan cheese",
        "salt",
        "shredded coconut",
        "sugar",
        "vanilla extract",
        "water"
    ]
}
```


### (GET) `/get_recipe_by_id`: get recipe by id

Example request:

```
http://localhost:8000/get_recipe_by_id/?id=605d65cb8ef41b2471f31ae2
```

Example response:

```json
{
    "recipe": {
        "yield": {
            "yield_amount": 4,
            "yield_unit": "servings"
        },
        "meal_type": {
            "breakfast": false,
            "lunch": true,
            "dinner": true,
            "appetizer": false,
            "side_dish": false,
            "snack": false,
            "dessert": false
        },
        "dietary_categories": {
            "low_sodium": false,
            "low_fat": false,
            "low_carb": false,
            "gluten_free": false,
            "dairy_free": false,
            "nut_free": false,
            "low_sugar": false,
            "low_calories": false,
            "all_natural": false,
            "vegetarian": false,
            "vegan": false,
            "healthy": false
        },
        "_id": "605d65cb8ef41b2471f31ad9",
        "name": "Homemade Mac and Cheese",
        "description": "This is a nice rich mac and cheese. Serve with a salad for a great meatless dinner. Hope you enjoy it.",
        "prep_time": 20,
        "cook_time": 30,
        "servings": 4,
        "calories": 800,
        "dish_type": "pasta",
        "ingredients": [
            {
                "ingredient_measurement": {
                    "measurement_amount": 8,
                    "measurement_unit": "ounces"
                },
                "_id": "605d65cb8ef41b2471f31ada",
                "ingredient_name": "elbow macaroni",
                "ingredient_type": "grains"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 2,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31adb",
                "ingredient_name": "cheddar cheese",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 0.5,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31adc",
                "ingredient_name": "parmesan cheese",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 3,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31add",
                "ingredient_name": "milk",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 0.25,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31ade",
                "ingredient_name": "butter",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 2.5,
                    "measurement_unit": "tablespoons"
                },
                "_id": "605d65cb8ef41b2471f31adf",
                "ingredient_name": "flour",
                "ingredient_type": "baking"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 0.5,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31ae0",
                "ingredient_name": "bread crumbs",
                "ingredient_type": "grains"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "pinch"
                },
                "_id": "605d65cb8ef41b2471f31ae1",
                "ingredient_name": "paprika",
                "ingredient_type": "seasoning"
            }
        ],
        "recipe_steps": [
            {
                "_id": "605d65cb8ef41b2471f31ae2",
                "step_number": 1,
                "step_description": "Cook macaroni according to the package directions. Drain."
            },
            {
                "_id": "605d65cb8ef41b2471f31ae3",
                "step_number": 2,
                "step_description": "In a saucepan, melt butter or margarine over medium heat. Stir in enough flour to make a roux. Add milk to roux slowly, stirring constantly. Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick. Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well."
            },
            {
                "_id": "605d65cb8ef41b2471f31ae4",
                "step_number": 3,
                "step_description": "Melt butter or margarine in a skillet over medium heat. Add breadcrumbs and brown. Spread over the macaroni and cheese to cover. Sprinkle with a little paprika."
            },
            {
                "_id": "605d65cb8ef41b2471f31ae5",
                "step_number": 4,
                "step_description": "Bake at 350 degrees F (175 degrees C) for 30 minutes. Serve."
            }
        ],
        "__v": 0
    }
}
```

### (GET) `/get_recipes_by_name`: get list of recipe(s) containing name

Example request:

```
http://localhost:8000/get_recipes_by_name/?name=waffle
```

Example response:

```json
{
    "recipes": [
        {
            "yield": {
                "yield_amount": 10,
                "yield_unit": "waffles"
            },
            "meal_type": {
                "breakfast": true,
                "lunch": true,
                "dinner": false,
                "appetizer": false,
                "side_dish": false,
                "snack": false,
                "dessert": false
            },
            "dietary_categories": {
                "low_sodium": false,
                "low_fat": false,
                "low_carb": false,
                "gluten_free": false,
                "dairy_free": false,
                "nut_free": false,
                "low_sugar": false,
                "low_calories": false,
                "all_natural": false,
                "vegetarian": false,
                "vegan": false,
                "healthy": false
            },
            "_id": "605d61608ef41b2471f31ac3",
            "name": "Classic Waffles",
            "description": "A lovely, crispy waffle perfect for the morning",
            "prep_time": 10,
            "cook_time": 15,
            "servings": 5,
            "calories": 400,
            "dish_type": "waffles",
            "ingredients": [
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d61608ef41b2471f31ac4",
                    "ingredient_name": "flour",
                    "ingredient_type": "baking"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "teaspoons"
                    },
                    "_id": "605d61608ef41b2471f31ac5",
                    "ingredient_name": "salt",
                    "ingredient_type": "seasoning"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 4,
                        "measurement_unit": "teaspoons"
                    },
                    "_id": "605d61608ef41b2471f31ac6",
                    "ingredient_name": "baking powder",
                    "ingredient_type": "baking"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 4,
                        "measurement_unit": "tablespoons"
                    },
                    "_id": "605d61608ef41b2471f31ac7",
                    "ingredient_name": "sugar",
                    "ingredient_type": "sweetener"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2,
                        "measurement_unit": "eggs"
                    },
                    "_id": "605d61608ef41b2471f31ac8",
                    "ingredient_name": "eggs",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1.5,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d61608ef41b2471f31ac9",
                    "ingredient_name": "milk",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.3,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d61608ef41b2471f31aca",
                    "ingredient_name": "butter",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "teaspoon"
                    },
                    "_id": "605d61608ef41b2471f31acb",
                    "ingredient_name": "vanilla extract",
                    "ingredient_type": "sweetener"
                }
            ],
            "recipe_steps": [
                {
                    "_id": "605d61608ef41b2471f31acc",
                    "step_number": 1,
                    "step_description": "In a large bowl, mix together flour, salt, baking powder and sugar; set aside. Preheat waffle iron to desired temperature."
                },
                {
                    "_id": "605d61608ef41b2471f31acd",
                    "step_number": 2,
                    "step_description": "In a separate bowl, beat the eggs. Stir in the milk, butter and vanilla. Pour the milk mixture into the flour mixture; beat until blended."
                },
                {
                    "_id": "605d61608ef41b2471f31ace",
                    "step_number": 3,
                    "step_description": "Ladle the batter into a preheated waffle iron. Cook the waffles until golden and crisp. Serve immediately."
                }
            ],
            "__v": 0
        }
    ]
}
```

### (POST) `/create_recipe`: create new recipe

Example request:

```
http://localhost:8000/create_recipe
```

Example Request Body:

```json
{
	"name": "Blueberry Smoothie Bowl", 
	"description": "Quick and easy blueberry smoothie topped with coconut, almonds, and banana.", 
	"prep_time": 10, 
	"cook_time": 0, 
	"servings": 1, 
	"calories": 350, 
	"yield_amount": 1, 
	"yield_unit": "smoothie bowl", 
	"meal_type": ["breakfast", "snack"], 
	"dietary_categories": ["vegetarian", "healthy"], 
	"dish_type": "smoothie bowl", 
	"ingredients": [
		{"ingredient_name": "blueberries", "measurement_amount": 1, "measurement_unit": "cups", "ingredient_type": "fruit"}, 
		{"ingredient_name": "banana", "measurement_amount": 1, "measurement_unit": "banana",
        "ingredient_type": "fruit"},
        {"ingredient_name": "water", "measurement_amount": 2, "measurement_unit": "tablespoons",
        "ingredient_type": "water"},
        {"ingredient_name": "cashew butter", "measurement_amount": 1, "measurement_unit": "tablespoons",
        "ingredient_type": "nuts"},
        {"ingredient_name": "vanilla extract", "measurement_amount": 1, "measurement_unit": "teaspoons",
        "ingredient_type": "sweetener"},
        {"ingredient_name": "almonds", "measurement_amount": 1, "measurement_unit": "tablespoon (sliced)",
        "ingredient_type": "nuts"},
        {"ingredient_name": "shredded coconut", "measurement_amount": 1, "measurement_unit": "tablespoons",
        "ingredient_type": "nuts"}], 
	"recipe_steps": ["Blend blueberries, 1/2 banana, water, cashew butter, and vanilla extract together in a blender until smooth; pour into a bowl.", "Top smoothie with sliced banana, almonds, and coconut."]
}

```

Example response:

```json
{
    "message": "Recipe created",
    "recipe": {
        "_id": "605d639c8ef41b2471f31acf",
        "name": "Blueberry Smoothie Bowl",
        "description": "Quick and easy blueberry smoothie topped with coconut, almonds, and banana.",
        "prep_time": 10,
        "servings": 1,
        "calories": 350,
        "yield": {
            "yield_amount": 1,
            "yield_unit": "smoothie bowl"
        },
        "meal_type": {
            "breakfast": true,
            "lunch": false,
            "dinner": false,
            "appetizer": false,
            "side_dish": false,
            "snack": true,
            "dessert": false
        },
        "dietary_categories": {
            "low_sodium": false,
            "low_fat": false,
            "low_carb": false,
            "gluten_free": false,
            "dairy_free": false,
            "nut_free": false,
            "low_sugar": false,
            "low_calories": false,
            "all_natural": false,
            "vegetarian": true,
            "vegan": false,
            "healthy": true
        },
        "dish_type": "smoothie bowl",
        "ingredients": [
            {
                "_id": "605d639c8ef41b2471f31ad0",
                "ingredient_name": "blueberries",
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "cups"
                },
                "ingredient_type": "fruit"
            },
            {
                "_id": "605d639c8ef41b2471f31ad1",
                "ingredient_name": "banana",
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "banana"
                },
                "ingredient_type": "fruit"
            },
            {
                "_id": "605d639c8ef41b2471f31ad2",
                "ingredient_name": "water",
                "ingredient_measurement": {
                    "measurement_amount": 2,
                    "measurement_unit": "tablespoons"
                },
                "ingredient_type": "water"
            },
            {
                "_id": "605d639c8ef41b2471f31ad3",
                "ingredient_name": "cashew butter",
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "tablespoons"
                },
                "ingredient_type": "nuts"
            },
            {
                "_id": "605d639c8ef41b2471f31ad4",
                "ingredient_name": "vanilla extract",
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "teaspoons"
                },
                "ingredient_type": "sweetener"
            },
            {
                "_id": "605d639c8ef41b2471f31ad5",
                "ingredient_name": "almonds",
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "tablespoon (sliced)"
                },
                "ingredient_type": "nuts"
            },
            {
                "_id": "605d639c8ef41b2471f31ad6",
                "ingredient_name": "shredded coconut",
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "tablespoons"
                },
                "ingredient_type": "nuts"
            }
        ],
        "recipe_steps": [
            {
                "_id": "605d639c8ef41b2471f31ad7",
                "step_number": 1,
                "step_description": "Blend blueberries, 1/2 banana, water, cashew butter, and vanilla extract together in a blender until smooth; pour into a bowl."
            },
            {
                "_id": "605d639c8ef41b2471f31ad8",
                "step_number": 2,
                "step_description": "Top smoothie with sliced banana, almonds, and coconut."
            }
        ],
        "__v": 0
    }
}
```

### (POST) `/filter_recipes`: get filtered list of recipes filtered by one or more of the supported filters (or returns full recipe list if no filters provided)- - can supply optional limit and skip number

Example request:

```
http://localhost:8000/filter_recipes?limit=1&skip=0
```

Example Request Body:

```json
{
    "filter_category": [],
    "filter_meal_type": ["lunch"], 
	"filter_ingredient_contains": ["butter", "flour", "almonds"],
	"filter_ingredient_only": [],
	"filter_ingredient_exclude": ["vanilla extract"]
}
```

Example response:

```json
{
    "count": 1,
    "recipes": [
        {
            "yield": {
                "yield_amount": 4,
                "yield_unit": "servings"
            },
            "meal_type": {
                "breakfast": false,
                "lunch": true,
                "dinner": true,
                "appetizer": false,
                "side_dish": false,
                "snack": false,
                "dessert": false
            },
            "dietary_categories": {
                "low_sodium": false,
                "low_fat": false,
                "low_carb": false,
                "gluten_free": false,
                "dairy_free": false,
                "nut_free": false,
                "low_sugar": false,
                "low_calories": false,
                "all_natural": false,
                "vegetarian": false,
                "vegan": false,
                "healthy": false
            },
            "_id": "605d65cb8ef41b2471f31ad9",
            "name": "Homemade Mac and Cheese",
            "description": "This is a nice rich mac and cheese. Serve with a salad for a great meatless dinner. Hope you enjoy it.",
            "prep_time": 20,
            "cook_time": 30,
            "servings": 4,
            "calories": 800,
            "dish_type": "pasta",
            "ingredients": [
                {
                    "ingredient_measurement": {
                        "measurement_amount": 8,
                        "measurement_unit": "ounces"
                    },
                    "_id": "605d65cb8ef41b2471f31ada",
                    "ingredient_name": "elbow macaroni",
                    "ingredient_type": "grains"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31adb",
                    "ingredient_name": "cheddar cheese",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.5,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31adc",
                    "ingredient_name": "parmesan cheese",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 3,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31add",
                    "ingredient_name": "milk",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.25,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31ade",
                    "ingredient_name": "butter",
                    "ingredient_type": "dairy"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 2.5,
                        "measurement_unit": "tablespoons"
                    },
                    "_id": "605d65cb8ef41b2471f31adf",
                    "ingredient_name": "flour",
                    "ingredient_type": "baking"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 0.5,
                        "measurement_unit": "cups"
                    },
                    "_id": "605d65cb8ef41b2471f31ae0",
                    "ingredient_name": "bread crumbs",
                    "ingredient_type": "grains"
                },
                {
                    "ingredient_measurement": {
                        "measurement_amount": 1,
                        "measurement_unit": "pinch"
                    },
                    "_id": "605d65cb8ef41b2471f31ae1",
                    "ingredient_name": "paprika",
                    "ingredient_type": "seasoning"
                }
            ],
            "recipe_steps": [
                {
                    "_id": "605d65cb8ef41b2471f31ae2",
                    "step_number": 1,
                    "step_description": "Cook macaroni according to the package directions. Drain."
                },
                {
                    "_id": "605d65cb8ef41b2471f31ae3",
                    "step_number": 2,
                    "step_description": "In a saucepan, melt butter or margarine over medium heat. Stir in enough flour to make a roux. Add milk to roux slowly, stirring constantly. Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick. Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well."
                },
                {
                    "_id": "605d65cb8ef41b2471f31ae4",
                    "step_number": 3,
                    "step_description": "Melt butter or margarine in a skillet over medium heat. Add breadcrumbs and brown. Spread over the macaroni and cheese to cover. Sprinkle with a little paprika."
                },
                {
                    "_id": "605d65cb8ef41b2471f31ae5",
                    "step_number": 4,
                    "step_description": "Bake at 350 degrees F (175 degrees C) for 30 minutes. Serve."
                }
            ],
            "__v": 0
        }
    ]
}
```

### (PUT) `/update_recipe_by_id`: updates recipe information for existing recipe by id

Example request:

```
http://localhost:8000/update_recipe_by_id
```

Example Request Body:

```json
{
    "id": "605d65cb8ef41b2471f31ad9",
    "updates": {
        "prep_time": 15,
        "cook_time": 40,
        "servings": 6,
        "calories": 500,
        "meal_type": ["lunch", "dinner", "side_dish"]
    }
}
```

Example response:

```json
{
    "message": "Recipe information updated",
    "recipe": {
        "yield": {
            "yield_amount": 4,
            "yield_unit": "servings"
        },
        "meal_type": {
            "breakfast": false,
            "lunch": true,
            "dinner": true,
            "appetizer": false,
            "side_dish": true,
            "snack": false,
            "dessert": false
        },
        "dietary_categories": {
            "low_sodium": false,
            "low_fat": false,
            "low_carb": false,
            "gluten_free": false,
            "dairy_free": false,
            "nut_free": false,
            "low_sugar": false,
            "low_calories": false,
            "all_natural": false,
            "vegetarian": false,
            "vegan": false,
            "healthy": false
        },
        "_id": "605d65cb8ef41b2471f31ad9",
        "name": "Homemade Mac and Cheese",
        "description": "This is a nice rich mac and cheese. Serve with a salad for a great meatless dinner. Hope you enjoy it.",
        "prep_time": 15,
        "cook_time": 40,
        "servings": 6,
        "calories": 500,
        "dish_type": "pasta",
        "ingredients": [
            {
                "ingredient_measurement": {
                    "measurement_amount": 8,
                    "measurement_unit": "ounces"
                },
                "_id": "605d65cb8ef41b2471f31ada",
                "ingredient_name": "elbow macaroni",
                "ingredient_type": "grains"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 2,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31adb",
                "ingredient_name": "cheddar cheese",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 0.5,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31adc",
                "ingredient_name": "parmesan cheese",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 3,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31add",
                "ingredient_name": "milk",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 0.25,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31ade",
                "ingredient_name": "butter",
                "ingredient_type": "dairy"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 2.5,
                    "measurement_unit": "tablespoons"
                },
                "_id": "605d65cb8ef41b2471f31adf",
                "ingredient_name": "flour",
                "ingredient_type": "baking"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 0.5,
                    "measurement_unit": "cups"
                },
                "_id": "605d65cb8ef41b2471f31ae0",
                "ingredient_name": "bread crumbs",
                "ingredient_type": "grains"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "pinch"
                },
                "_id": "605d65cb8ef41b2471f31ae1",
                "ingredient_name": "paprika",
                "ingredient_type": "seasoning"
            }
        ],
        "recipe_steps": [
            {
                "_id": "605d65cb8ef41b2471f31ae2",
                "step_number": 1,
                "step_description": "Cook macaroni according to the package directions. Drain."
            },
            {
                "_id": "605d65cb8ef41b2471f31ae3",
                "step_number": 2,
                "step_description": "In a saucepan, melt butter or margarine over medium heat. Stir in enough flour to make a roux. Add milk to roux slowly, stirring constantly. Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick. Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well."
            },
            {
                "_id": "605d65cb8ef41b2471f31ae4",
                "step_number": 3,
                "step_description": "Melt butter or margarine in a skillet over medium heat. Add breadcrumbs and brown. Spread over the macaroni and cheese to cover. Sprinkle with a little paprika."
            },
            {
                "_id": "605d65cb8ef41b2471f31ae5",
                "step_number": 4,
                "step_description": "Bake at 350 degrees F (175 degrees C) for 30 minutes. Serve."
            }
        ],
        "__v": 0
    }
}
```

### (PUT) `/update_recipe_by_name`: updates recipe information for existing recipe by exact name

Example request:

```
http://localhost:8000/update_recipe_by_name
```


Example Request Body:

```json
{
    "name": "Homemade Mac and Cheese",
    "updates": {
        "prep_time": 15,
        "cook_time": 40,
        "servings": 6,
        "calories": 500,
        "meal_type": ["lunch", "dinner", "side_dish"]
    }
}
```

Example response:

Same as above example

### (DELETE) `/delete_recipe_by_id`: delete existing recipe by id

Example request:

```
http://localhost:8000/delete_recipe_by_id?id=605d639c8ef41b2471f31acf
```

Example response:

```json
{
    "message": "Recipe deleted",
    "recipe": {
        "yield": {
            "yield_amount": 1,
            "yield_unit": "smoothie bowl"
        },
        "meal_type": {
            "breakfast": true,
            "lunch": false,
            "dinner": false,
            "appetizer": false,
            "side_dish": false,
            "snack": true,
            "dessert": false
        },
        "dietary_categories": {
            "low_sodium": false,
            "low_fat": false,
            "low_carb": false,
            "gluten_free": false,
            "dairy_free": false,
            "nut_free": false,
            "low_sugar": false,
            "low_calories": false,
            "all_natural": false,
            "vegetarian": true,
            "vegan": false,
            "healthy": true
        },
        "_id": "605d639c8ef41b2471f31acf",
        "name": "Blueberry Smoothie Bowl",
        "description": "Quick and easy blueberry smoothie topped with coconut, almonds, and banana.",
        "prep_time": 10,
        "servings": 1,
        "calories": 350,
        "dish_type": "smoothie bowl",
        "ingredients": [
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "cups"
                },
                "_id": "605d639c8ef41b2471f31ad0",
                "ingredient_name": "blueberries",
                "ingredient_type": "fruit"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "banana"
                },
                "_id": "605d639c8ef41b2471f31ad1",
                "ingredient_name": "banana",
                "ingredient_type": "fruit"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 2,
                    "measurement_unit": "tablespoons"
                },
                "_id": "605d639c8ef41b2471f31ad2",
                "ingredient_name": "water",
                "ingredient_type": "water"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "tablespoons"
                },
                "_id": "605d639c8ef41b2471f31ad3",
                "ingredient_name": "cashew butter",
                "ingredient_type": "nuts"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "teaspoons"
                },
                "_id": "605d639c8ef41b2471f31ad4",
                "ingredient_name": "vanilla extract",
                "ingredient_type": "sweetener"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "tablespoon (sliced)"
                },
                "_id": "605d639c8ef41b2471f31ad5",
                "ingredient_name": "almonds",
                "ingredient_type": "nuts"
            },
            {
                "ingredient_measurement": {
                    "measurement_amount": 1,
                    "measurement_unit": "tablespoons"
                },
                "_id": "605d639c8ef41b2471f31ad6",
                "ingredient_name": "shredded coconut",
                "ingredient_type": "nuts"
            }
        ],
        "recipe_steps": [
            {
                "_id": "605d639c8ef41b2471f31ad7",
                "step_number": 1,
                "step_description": "Blend blueberries, 1/2 banana, water, cashew butter, and vanilla extract together in a blender until smooth; pour into a bowl."
            },
            {
                "_id": "605d639c8ef41b2471f31ad8",
                "step_number": 2,
                "step_description": "Top smoothie with sliced banana, almonds, and coconut."
            }
        ],
        "__v": 0
    }
}
```

### (DELETE) `/delete_recipe_by_name`: delete existing recipe by exact name

Example request:

```
http://localhost:8000/delete_recipe_by_name?name=Blueberry Smoothie Bowl
```

Example response:

Same as above example
