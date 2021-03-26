var faker = require('faker');
import axios from 'axios';
const url = 'http://localhost:8000';
import * as readline from 'readline';

const dietary_categories = ["low_sodium", "low_fat", "low_carb", "gluten_free", "dairy_free", "nut_free", "low_sugar", "low_calories", "all_natural", "vegetarian", "vegan", "healthy"]
const meal_type = ["breakfast", "lunch", "dinner", "snack", "appetizer", "side_dish", "dessert"]

let totalRecipes = 0;

async function recipeMockData() {
    // Number of fake recipes to create entered from console
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    await rl.question("Enter total number of fake recipes to create: ", function(answer) {
        try {
            totalRecipes = Number(answer)
            if (totalRecipes <= 0) {
                throw new Error("Must provide a number greater than 0");
            } else {
                populateRecipes();
            }
        } catch(err) {
            console.log(err)
            throw new Error("Must provide a valid number");
        }
    rl.close();
    });

}

// Interface defining the structure of a recipe creation request
interface RecipeCreate {
	name?: string, 
	description?: string, 
	prep_time?: number, 
	cook_time?: number, 
	servings?: number, 
	calories?: number, 
	yield_amount?: number, 
	yield_unit?: string, 
	meal_type?: string[], 
	dietary_categories?: string[], 
	dish_type?: string, 
	ingredients?: IngredientCreate[],
	recipe_steps?: string[]
}

// Interface for ingredient recipe create list
interface IngredientCreate {
    ingredient_name: string, 
    measurement_amount: number, 
    measurement_unit: string, 
    ingredient_type: string
}

async function populateRecipes() {
    for (let recipes = 1; recipes <=totalRecipes; recipes++) {
        let newRecipe = {} as RecipeCreate

        newRecipe.name = faker.commerce.productName();
        newRecipe.description = faker.commerce.productDescription();
        newRecipe.cook_time = faker.datatype.number({'min': 0, 'max': 30});
        newRecipe.prep_time = faker.datatype.number({'min': 0, 'max': 120});
        newRecipe.servings = faker.datatype.number({'min': 1, 'max': 10});
        newRecipe.calories = faker.datatype.number({'min': 100, 'max': 1000});
        newRecipe.yield_amount = faker.datatype.number({'min': 1, 'max': 5});
        newRecipe.yield_unit = faker.random.word();
        newRecipe.meal_type = faker.random.arrayElements(meal_type, faker.datatype.number({'min': 0, 'max': meal_type.length-1}));
        newRecipe.dietary_categories = faker.random.arrayElements(dietary_categories, faker.datatype.number({'min': 0, 'max': dietary_categories.length-1}));
        newRecipe.dish_type = faker.commerce.product();
        let index = faker.datatype.number({'min': 1, 'max': 4});
        newRecipe.recipe_steps = [];
        for (let i = 1; i <= index; i++) {
            newRecipe.recipe_steps.push(faker.lorem.paragraph(faker.datatype.number({'min': 1, 'max': 3})))
        }

        index = faker.datatype.number({'min': 1, 'max': 4});
        let ingredientsList: IngredientCreate[] = [];
        for (let i = 1; i <= index; i++) {
            let newIngredient = {} as IngredientCreate;
            newIngredient.ingredient_name = faker.commerce.productMaterial();
            newIngredient.measurement_amount = faker.datatype.number({'min': 1, 'max': 10});
            newIngredient.measurement_unit = faker.random.word();
            newIngredient.ingredient_type = faker.commerce.productAdjective();
            ingredientsList.push(newIngredient);
        }

        newRecipe.ingredients = ingredientsList;

        // Send fake recipe to Recipe microservice creation endpoint
        let postURL = url+'/create_recipe';
        try {
            await axios.post(postURL, newRecipe)
            console.log("Added " + recipes.toString() + "/" + totalRecipes.toString()+ " Recipes!");
            // Add small delay between requests
            await delay(100);

        } catch(error) {
            console.log("Error adding recipe to DB")
        }
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

recipeMockData();