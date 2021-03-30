import axios from 'axios';
import { create } from 'domain';
const url = 'http://localhost:8091';
import {RecipeCreate, RecipeFilter, RecipeUpdate} from './recipe_interfaces';


// Create New Recipe Examples
async function createRecipe() {
    let recipeIDArr = [];

    // Endpoint URL to create new recipe
    let createURL = url+'/api/recipes/create_recipe';

    // Create a recipe using the RecipeCreate interface (in recipe_interfaces.ts file)
    let blackBeanBurger = {} as RecipeCreate;
    
    // Give recipe a name- this is required to successfully create and store a new recipe
    blackBeanBurger.name = 'Homemade Black Bean Veggie Burgers';

    // Add a recipe description
    blackBeanBurger.description = "You will never want to eat frozen veggie burgers again. These are so easy, and you'll be proud to have created such a vegetarian delight.";
    
    // Add recipe prep time
    blackBeanBurger.prep_time = 15;

    // Add recipe cook time
    blackBeanBurger.cook_time = 20;

    // Add recipe total servings
    blackBeanBurger.servings = 4;

    // Add recipe yield amount- quantifies what a serving is
    blackBeanBurger.yield_amount = 4;

    // Add recipe yield unit
    blackBeanBurger.yield_unit = 'patties';

    // Add recipe calories
    blackBeanBurger.calories = 198;

    // Add recipe main dish type 
    blackBeanBurger.dish_type = 'protein';

    // Add recipe dietary categories- these are categories that exist in the Dietary_Categories interface
    blackBeanBurger.dietary_categories = ['vegetarian', 'healthy', 'low_calories'];

    // Add recipe meal types- these are meal types that exist in the Meal_Type interface
    blackBeanBurger.meal_type= ["lunch", "dinner"]

    // Add recipe steps- these will be numbered by the recipe microservice in the order they exist in the array
    blackBeanBurger.recipe_steps = [
        "If grilling, preheat an outdoor grill for high heat, and lightly oil a sheet of aluminum foil. If baking, preheat oven to 375 degrees F (190 degrees C), and lightly oil a baking sheet.",
        "In a medium bowl, mash black beans with a fork until thick and pasty.",
        "In a food processor, finely chop bell pepper, onion, and garlic. Then stir into mashed beans.",
        "In a small bowl, stir together egg, chili powder, cumin, and chili sauce.",
        "Stir the egg mixture into the mashed beans. Mix in bread crumbs until the mixture is sticky and holds together. Divide mixture into four patties.",
        "If grilling, place patties on foil, and grill about 8 minutes on each side. If baking, place patties on baking sheet, and bake about 10 minutes on each side."
    ]

    // Add recipe ingredients- these are ingredients that are necessary to make the meal
    blackBeanBurger.ingredients = [
        {"ingredient_name": "black beans", "measurement_amount": 16, "measurement_unit": "ounces", "ingredient_type": "legumes"}, 
        {"ingredient_name": "green bell pepper", "measurement_amount": 0.5, "measurement_unit": "pepper", "ingredient_type": "fruit"},
        {"ingredient_name": "onion", "measurement_amount": 1, "measurement_unit": "onion", "ingredient_type": "vegetable"},
        {"ingredient_name": "garlic", "measurement_amount": 3, "measurement_unit": "cloves", "ingredient_type": "vegetable"},
        {"ingredient_name": "egg", "measurement_amount": 1, "measurement_unit": "egg", "ingredient_type": "protein"},
        {"ingredient_name": "chili powder", "measurement_amount": 1, "measurement_unit": "tablespoon", "ingredient_type": "spice"},
        {"ingredient_name": "cumin", "measurement_amount": 1, "measurement_unit": "tablespoons", "ingredient_type": "spice"},
        {"ingredient_name": "chili sauce", "measurement_amount": 1, "measurement_unit": "teaspoon", "ingredient_type": "sauce"},
        {"ingredient_name": "bread crumbs", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "grain"}
    ]

    // Do not need to be added, but if there are any non-necessary ingredients you can add them in this field
    blackBeanBurger.ingredients_extra = [
        {"ingredient_name": "salt", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning"}
    ]

    // Create two more recipes:

    let granolaBar = {} as RecipeCreate;
    granolaBar.name = 'Oat-Free and Gluten-Free Granola Bars';
    granolaBar.description = "If you are trying to avoid certain grains and processed sugars, this is an excellent substitute for the traditional granola bar.";
    granolaBar.prep_time = 10;
    granolaBar.cook_time = 120;
    granolaBar.servings = 20;
    granolaBar.yield_amount = 20;
    granolaBar.yield_unit = 'granola bars';
    granolaBar.calories = 300;
    granolaBar.dish_type = 'grain';
    granolaBar.dietary_categories = ['vegetarian', 'low_sugar', 'gluten_free'];
    granolaBar.meal_type= ["snack"]
    granolaBar.recipe_steps = [
        "Place 3/4 cups almonds and 3/4 cups sunflower seeds into a food processor; chop until nuts are in 1/4-inch pieces, 1 to 2 minutes. Remove from food processor and pour in a bowl. Place the remaining almonds and sunflower seeds into the food processor; roughly chop into larger pieces, about 1 minute.",
        "Mix remaining nuts, seeds, shredded coconut, and dried apricot into the 1/4-inch nuts until fruit and nut mixture is combined.",
        "Combine coconut oil, honey, ground cinnamon, vanilla extract, and salt in a sauce pan over medium-low heat; cook until the coconut oil mixture bubbles and turns a lighter color, 3 to 5 minutes.",
        "Pour coconut oil mixture over the fruit and nut mixture; stir until the granola mixture takes on the consistency of wet sand, about 1 minute.",
        "Line a baking sheet with waxed paper. Pour granola mixture onto the sheet; place a second sheet of waxed paper on top of the granola mixture. Push down on the waxed paper with you hands until the granola mixture has been evenly spread. Pack tightly to ensure that the granola will not fall apart.",
        "Cool until granola has hardened, 2 to 3 hours. Cut into bars."
    ]
    granolaBar.ingredients = [
        {"ingredient_name": "almonds", "measurement_amount": 1.25, "measurement_unit": "cups", "ingredient_type": "nut"}, 
        {"ingredient_name": "sunflower seeds", "measurement_amount": 1.25, "measurement_unit": "cups", "ingredient_type": "seed"},
        {"ingredient_name": "shredded coconut", "measurement_amount": 2, "measurement_unit": "cups", "ingredient_type": "fruit"},
        {"ingredient_name": "dried apricot", "measurement_amount": 1, "measurement_unit": "cups", "ingredient_type": "fruit"},
        {"ingredient_name": "coconut oil", "measurement_amount": 1.5, "measurement_unit": "cups", "ingredient_type": "oil"},
        {"ingredient_name": "honey", "measurement_amount": 1, "measurement_unit": "tablespoon", "ingredient_type": "sweetener"},
        {"ingredient_name": "cinnamon", "measurement_amount": 1, "measurement_unit": "cups", "ingredient_type": "spice"},
        {"ingredient_name": "vanilla extract", "measurement_amount": 1, "measurement_unit": "teaspoons", "ingredient_type": "sweetener"},
        {"ingredient_name": "salt", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning"}
    ]

    granolaBar.ingredients_extra = [
        {"ingredient_name": "peanuts", "measurement_amount": 1.25, "measurement_unit": "cups", "ingredient_type": "nut"}, 
        {"ingredient_name": "craisins", "measurement_amount": 1, "measurement_unit": "cups", "ingredient_type": "nut"}, 
    ]

    let macAndCheese = {} as RecipeCreate
    macAndCheese.name = 'Homemade Mac and Cheese';
    macAndCheese.description = "This is a nice rich mac and cheese. Serve with a salad for a great meatless dinner. Hope you enjoy it.";
    macAndCheese.prep_time = 20;
    macAndCheese.cook_time = 30;
    macAndCheese.servings = 4;
    macAndCheese.yield_amount = 4;
    macAndCheese.yield_unit = 'serving';
    macAndCheese.calories = 800;
    macAndCheese.dish_type = 'grain';
    macAndCheese.dietary_categories = [];
    macAndCheese.meal_type= ["lunch", "dinner"]
    macAndCheese.recipe_steps = [
        "Cook macaroni according to the package directions. Drain.", 
        "In a saucepan, melt butter or margarine over medium heat. Stir in enough flour to make a roux. Add milk to roux slowly, stirring constantly. Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick. Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well.", 
        "Melt butter or margarine in a skillet over medium heat. Add breadcrumbs and brown. Spread over the macaroni and cheese to cover. Sprinkle with a little paprika.", 
        "Bake at 350 degrees F (175 degrees C) for 30 minutes. Serve."
    ]
    macAndCheese.ingredients = [
        {"ingredient_name": "macaroni", "measurement_amount": 8, "measurement_unit": "ounces", "ingredient_type": "grains"}, 
        {"ingredient_name": "cheddar cheese", "measurement_amount": 2, "measurement_unit": "cups", "ingredient_type": "dairy"},
        {"ingredient_name": "parmesan cheese", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "dairy"},
        {"ingredient_name": "milk", "measurement_amount": 3, "measurement_unit": "cups", "ingredient_type": "dairy"},
        {"ingredient_name": "butter", "measurement_amount": 0.25, "measurement_unit": "cups", "ingredient_type": "dairy"},
        {"ingredient_name": "flour", "measurement_amount": 2.5, "measurement_unit": "tablespoons", "ingredient_type": "baking"},
        {"ingredient_name": "bread crumbs", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "grains"}, 
    ]
    macAndCheese.ingredients_extra = [
        {"ingredient_name": "paprika", "measurement_amount": 1, "measurement_unit": "pinch", "ingredient_type": "seasoning"} 
    ]

    // Send recipes to the recipe microservice's create_recipe endpoint (POST request)
    try {
        let recipe = await axios.post(createURL, blackBeanBurger);
        recipeIDArr.push(recipe.data.recipe._id);

    } catch(error) {
        console.log("Error adding recipe to DB")
        throw error;
    }

    try {
        let recipe = await axios.post(createURL, granolaBar);
        recipeIDArr.push(recipe.data.recipe._id);

    } catch(error) {
        console.log("Error adding recipe to DB");
        throw error;
    }

    try {
        let recipe = await axios.post(createURL, macAndCheese);
        recipeIDArr.push(recipe.data.recipe._id);

    } catch(error) {
        console.log("Error adding recipe to DB")
        throw error;
    }

    return recipeIDArr;
}

// Get Recipes Examples
async function getRecipes(id:string) {
    let getURL = url + '/api/recipes/get_recipes'
    // Get list of all stored recipes from the recipe microservice using get_recipes endpoint (GET request)
    try {
        let recipeList = await axios.get(getURL)
        console.log("Full Recipe List:")
        console.log(recipeList.data)
    } catch(error) {
        console.log("Error getting recipes from recipe microservice")
        throw error;
    }

    // Get limited list of all stored recipes from the recipe microservice using get_recipes endpoint and provide a limit (GET request)
    try {
        let recipeList = await axios.get(getURL, {params: {limit: 2}})
        console.log("Limited Recipe List:")
        console.log(recipeList.data)
    } catch(error) {
        console.log("Error getting recipes from recipe microservice")
        throw error;
    }

   // Get limited list of all stored recipes from the recipe microservice using get_recipes endpoint and provide a limit. 
   // Also provide a skip number to skip over recipes in the recipe microservice's DB (GET request)
    try {
        let recipeList = await axios.get(getURL, {params: {limit: 2, skip: 1}})
        console.log("Limited Recipe List Skipping First Entry:")
        console.log(recipeList.data)
    } catch(error) {
        console.log("Error getting recipes from recipe microservice")
        throw error;
    }

    // Get specific recipe by providing its ID using the get_recipe_by_id endpoint (GET request)
    try {
        let getIDURL = url + '/api/recipes/get_recipe_by_id';
        let recipeList = await axios.get(getIDURL, {params: {id: id}})
        console.log("Recipe List by ID:")
        console.log(recipeList.data)
    } catch(error) {
        console.log("Error getting recipes from recipe microservice")
        throw error;
    }

    // Get list of one or many recipes that contain the specified name within it's recipe name (punctuation does not matter) using get_recipes_by_name endpoint (GET request)
    try {
        let getNameURL = url + '/api/recipes/get_recipes_by_name'
        let recipeList = await axios.get(getNameURL, {params: {name: "burger"}})
        console.log("Recipe List by Name:")
        console.log(recipeList.data)
    } catch(error) {
        console.log("Error getting recipes from recipe microservice")
        throw error;
    }
}

// Get Ingredient List- will be all ingredients both necessary and unnecessary from all recipes using get_ingredients_list endpoint (GET request)
async function GetIngredients() {
    let getURL = url + '/api/recipes/get_ingredients_list'
    // Get all ingredients
    try {
        let ingredientList = await axios.get(getURL)
        console.log("Full Ingredient List:")
        console.log(ingredientList.data)
    } catch(error) {
        console.log("Error getting ingredients from recipe microservice")
        throw error;
    }
}

// Filter Recipe Examples using the filter_recipes endpoint (POST request)
async function filterRecipes() {
    let filterURL = url + '/api/recipes/filter_recipes'
    let filterJSON = {} as RecipeFilter;

    // Get all meals that vegetarian, and that are either lunch and/or snack meals
    try {
        filterJSON.filter_category = ["vegetarian"];
        filterJSON.filter_meal_type = ["lunch", "snack"];
        let recipeList = await axios.post(filterURL, filterJSON);
        console.log("Filtered recipes that are vegetarian, and that are either lunch and/or snack meals:");
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error getting filtered recipes from recipe microservice")
        throw error;
    }

    filterJSON = {} as RecipeFilter

    // Get all meals that are vegetarian and low calories, and that are either lunch and/or snack meals
    try {
        filterJSON.filter_category = ["vegetarian", "low_calories"];
        filterJSON.filter_meal_type = ["lunch", "snack"];
        let recipeList = await axios.post(filterURL, filterJSON);
        console.log("Filtered recipes that are vegetarian and low calories, and that are either lunch and/or snack meals:");
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error getting filtered recipes from recipe microservice")
        throw error;
    }

    filterJSON = {} as RecipeFilter

    // Get all meals that have ingredient lists and/or ingredient extra lists that contain bread crumbs and/or macaroni
    try {
        filterJSON.filter_ingredient_contains = ["bread crumbs", "macaroni"];
        let recipeList = await axios.post(filterURL, filterJSON);
        console.log("Filtered recipes that have ingredient lists and/or ingredient extra lists that contain bread crumbs and/or macaroni:");
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error getting filtered recipes from recipe microservice")
        throw error;
    }

    filterJSON = {} as RecipeFilter

    // Get all meals that have ingredient lists with ALL ingredients in list: ["macaroni", "cheddar cheese", "parmesan cheese", "milk", "butter", "flour", "bread crumbs", "honey", "almonds"]
    // This ignores the ingredient extra field as these ingredients are not necessary- therefore in this example paprika can be left out and the mac and cheese recipe is still returned
    try {
        filterJSON.filter_ingredient_only = ["macaroni", "cheddar cheese", "parmesan cheese", "milk", "butter", "flour", "bread crumbs", "honey", "almonds"];
        let recipeList = await axios.post(filterURL, filterJSON);
        console.log('Filtered recipes that have ingredient lists with ALL ingredients in list: ["macaroni", "cheddar cheese", "parmesan cheese", "milk", "butter", "flour", "bread crumbs", "honey", "almonds"]');
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error getting filtered recipes from recipe microservice")
        throw error;
    }

    filterJSON = {} as RecipeFilter

    // Get all meals that have ingredient lists with ALL ingredients in list in list: ["macaroni", "cheddar cheese", "parmesan cheese", "milk", "peanuts"]
    // Necessary ingredients for the mac and cheese recipe are not in list, therefore this recipe will not be returned as it cannot be made with only these ingredients
    try {
        filterJSON.filter_ingredient_only = ["macaroni", "cheddar cheese", "parmesan cheese", "milk"];
        let recipeList = await axios.post(filterURL, filterJSON);
        console.log('Filtered recipes that have ingredient lists with ALL ingredients in list: ["macaroni", "cheddar cheese", "parmesan cheese", "milk"]');
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error getting filtered recipes from recipe microservice")
        throw error;
    }

    filterJSON = {} as RecipeFilter

    // Get all meals that do not include macaroni or bread crumbs or peanuts
    // This ignores the ingredient extra field as these ingredients are not necessary- 
    // therefore in this example peanuts can be supplied and still return the granola recipe since it can be made without peanuts
    try {
        filterJSON.filter_ingredient_exclude = ["macaroni", "bread crumbs", "peanuts"];
        let recipeList = await axios.post(filterURL, filterJSON);
        console.log('Filtered recipes that do not include macaroni or bread crumbs or peanuts');
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error getting filtered recipes from recipe microservice")
        throw error;
    }

    filterJSON = {} as RecipeFilter

    // Get all meals that are vegetarian, that do not include almonds, that includes bread crumbs and/or macaroni, and that is a dinner or breakfast meal
    try {
        filterJSON.filter_category = ["vegetarian"]
        filterJSON.filter_ingredient_exclude = ["almonds"];
        filterJSON.filter_ingredient_contains = ["bread crumbs", "macaroni"]
        filterJSON.filter_meal_type = ["dinner", "breakfast"];
        let recipeList = await axios.post(filterURL, filterJSON);
        console.log('Filtered recipes that are vegetarian, that do not include almonds, that includes bread crumbs and/or macaroni, and that is a dinner or breakfast meal');
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error getting filtered recipes from recipe microservice")
        throw error;
    }

}

// Update Recipe (by id or name) Examples
async function updateRecipes(id: string) {

    let updateBlackBeanBurger = {} as RecipeCreate;

    // Update the black bean burger name
    updateBlackBeanBurger.name = 'Veggie Black Bean Burger';

    // Update the black bean burger description 
    updateBlackBeanBurger.description = "This black bean burger is delicious and vegatarian friendly!";
    
    // Update the black bean burger prep time 
    updateBlackBeanBurger.prep_time = 20;
    
    // Update the black bean burger cook time 
    updateBlackBeanBurger.cook_time = 30;
    
    // Update the black bean burger servings 
    updateBlackBeanBurger.servings = 5;
    
    // Update the black bean burger yield amount 
    updateBlackBeanBurger.yield_amount = 5;
    
    // Update the black bean burger yield unit 
    updateBlackBeanBurger.yield_unit = 'burgers';
    
    // Update the black bean burger calories 
    updateBlackBeanBurger.calories = 250;
    
    // Update the black bean burger dish type 
    updateBlackBeanBurger.dish_type = 'meat';

    // Update the black bean burger meal type from both lunch and dinner to dinner and appetizer- 
    // must include all the meal types you want to be true, even if they previously were set to true
    updateBlackBeanBurger.meal_type= ["dinner", "appetizer"]
    

    // Update the black bean burger categories to include vegan as well as what it already contained
    // must include all the dietary categories you want to be true, even if they previously were set to true
    updateBlackBeanBurger.dietary_categories = ['vegetarian', 'healthy', 'low_calories', 'vegan'];

    // Update the black bean burger recipe steps to include an extra step at the end- you must provide all recipe steps with new one added, not just the new one
    updateBlackBeanBurger.recipe_steps = [
        "If grilling, preheat an outdoor grill for high heat, and lightly oil a sheet of aluminum foil. If baking, preheat oven to 375 degrees F (190 degrees C), and lightly oil a baking sheet.",
        "In a medium bowl, mash black beans with a fork until thick and pasty.",
        "In a food processor, finely chop bell pepper, onion, and garlic. Then stir into mashed beans.",
        "In a small bowl, stir together egg, chili powder, cumin, and chili sauce.",
        "Stir the egg mixture into the mashed beans. Mix in bread crumbs until the mixture is sticky and holds together. Divide mixture into four patties.",
        "If grilling, place patties on foil, and grill about 8 minutes on each side. If baking, place patties on baking sheet, and bake about 10 minutes on each side.",
        "Serve with lettuce and tomatoes on a burger roll"
    ]

    // Update the black bean burger ingredients list to change the black beans measurement to 25
    // Must include the previous entire ingredient list with updates included
    updateBlackBeanBurger.ingredients = [
        {"ingredient_name": "black beans", "measurement_amount": 25, "measurement_unit": "ounces", "ingredient_type": "legumes"}, 
        {"ingredient_name": "green bell pepper", "measurement_amount": 0.5, "measurement_unit": "pepper", "ingredient_type": "fruit"},
        {"ingredient_name": "onion", "measurement_amount": 1, "measurement_unit": "onion", "ingredient_type": "vegetable"},
        {"ingredient_name": "garlic", "measurement_amount": 3, "measurement_unit": "cloves", "ingredient_type": "vegetable"},
        {"ingredient_name": "egg", "measurement_amount": 1, "measurement_unit": "egg", "ingredient_type": "protein"},
        {"ingredient_name": "chili powder", "measurement_amount": 1, "measurement_unit": "tablespoon", "ingredient_type": "spice"},
        {"ingredient_name": "cumin", "measurement_amount": 1, "measurement_unit": "tablespoons", "ingredient_type": "spice"},
        {"ingredient_name": "chili sauce", "measurement_amount": 1, "measurement_unit": "teaspoon", "ingredient_type": "sauce"},
        {"ingredient_name": "bread crumbs", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "grain"}
    ]

    // Update the black bean burger ingredients extra list to add a new ingredient
    // Must include the previous entire ingredient extra list with updates included
   updateBlackBeanBurger.ingredients_extra = [
    {"ingredient_name": "salt", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning"},
    {"ingredient_name": "pepper", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning"}
    ]


    // Create Update JSON that is sent to the update endpoint
    let recipeUpdateJSON = {} as RecipeUpdate;
    // Set the id of the recipe you want to update
    recipeUpdateJSON.id = id;
    // Set the update field equal to the updated recipe
    recipeUpdateJSON.updates = updateBlackBeanBurger;

    let updateIDURL = url+'/api/recipes/update_recipe_by_id'

    // Update recipe specified by its ID using the update_recipe_by_id endpoint (PUT request)
    try {
        let recipeList = await axios.put(updateIDURL, recipeUpdateJSON);
        console.log('Update black bean burger by ID response:');
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error updating recipe in recipe microservice")
        throw error;
    }

    // Update by Name
    updateBlackBeanBurger = {} as RecipeCreate;

    // Below only included a few fields we wish to update, fields that are not included are not affected

    // Update the black bean burger name
    updateBlackBeanBurger.name = 'Black Bean Veggie Burger Homemade';

    // Update the black bean burger meal type from both appetizer and dinner to dinner and lunch- 
    // must include all the meal types you want to be true, even if they previously were set to true
    updateBlackBeanBurger.meal_type= ["dinner", "lunch"]
    

    // Update the black bean burger categories to get rid of vegan, and keep what it already contained
    // must include all the dietary categories you want to be true, even if they previously were set to true
    updateBlackBeanBurger.dietary_categories = ['vegetarian', 'healthy', 'low_calories'];

    // Update the black bean burger ingredients extra list to add a new ingredient
    // Must include the previous entire ingredient extra list with updates included
   updateBlackBeanBurger.ingredients_extra = [
    {"ingredient_name": "pepper", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning"},
    {"ingredient_name": "garlic", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning"}
    ]


    // Create Update JSON that is sent to the update endpoint
    recipeUpdateJSON = {} as RecipeUpdate;
    // Set the name of the recipe you want to update
    recipeUpdateJSON.name = 'Veggie Black Bean Burger';
    // Set the update field equal to the updated recipe
    recipeUpdateJSON.updates = updateBlackBeanBurger;

    let updateNameURL = url+'/api/recipes/update_recipe_by_name'

    // Update recipe specified by its name using the update_recipe_by_name endpoint (PUT request)
    try {
        let recipeList = await axios.put(updateNameURL, recipeUpdateJSON);
        console.log('Update black bean burger by name response:');
        console.log(recipeList.data);
    } catch(error) {
        console.log("Error updating recipe in recipe microservice")
        throw error;
    }

}

// Delete Recipe (by id or name)
async function deleteRecipes(recipeIDArr: string[]) {
    // Delete the first two created recipes using their ids using delete_recipe_by_id endpoint (DELETE request)
    let deleteIDURL = url + '/api/recipes/delete_recipe_by_id'
    for (let i = 0; i < recipeIDArr.length-1; i++) {
        try {
            let response = await axios.delete(deleteIDURL, {params: {id: recipeIDArr[i]}});
            console.log('Delete Response for ID: '+ recipeIDArr[i]);
            console.log(response.data);
        } catch(error) {
            console.log("Error deleting recipe from recipe microservice")
            throw error;
        }
    }

    // Delete the last recipe by its exact name (punctuation matters) using delete_recipe_by_name endpoint (DELETE request)
    let deleteNameURL = url + '/api/recipes/delete_recipe_by_name'
    try {
        let response = await axios.delete(deleteNameURL, {params: {name: 'Homemade Mac and Cheese'}});
        console.log('Delete Response for Name Homemade Mac and Cheese:');
        console.log(response.data);
    } catch(error) {
        console.log("Error deleting recipe from recipe microservice")
        throw error;
    }
}

async function runExemplar() {
    let recipeIDArr = await createRecipe();
    if (recipeIDArr.length <= 0) {
        throw new Error("Error creating recipes");
    }
    await getRecipes(recipeIDArr[1]);
    await GetIngredients();
    await filterRecipes();
    await updateRecipes(recipeIDArr[0]);
    await deleteRecipes(recipeIDArr)
}

runExemplar();