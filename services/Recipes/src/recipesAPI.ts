import express from "express";
import mongoose from "mongoose";
import { CreateRecipe, DeleteRecipeID, DeleteRecipeName, GetRecipeByID, GetRecipes, GetRecipesByName, FilterRecipes, UpdateRecipeID, UpdateRecipeName, GetIngredients } from "./crudOperations";
import { IRecipes, IIngredients, IRecipeSteps, RecipeCreate, RecipeFilter } from "./models/recipesModels";

const app = express();
app.use(express.json());
const PORT = 8000;

// Connect to mongodb database
const uri = `mongodb://localhost/Recipes`
//const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DATABASE}`;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "[server] connection error:"));

db.once("open", () => {
  console.log("[server] database connected!");

  // Returns all recipes with all information from DB
  app.get("/get_recipes", async (req, res) => {
    try {
      const recipes = await GetRecipes();
      res.json({ count: recipes.length, recipes: recipes });
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Returns all distinct ingredient names from DB
  app.get("/get_ingredients_list", async (req, res) => {
    try {
      const ingredients = await GetIngredients();
      res.json({ count: ingredients.length, ingredients: ingredients });
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Returns one recipe specified by ID param with all its information 
  app.get("/get_recipe_by_id", async (req, res) => {
    if (!req.query.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    const id = String(req.query.id);
    try {
      const recipe = await GetRecipeByID({ id });
      if (recipe === null) {
        return res.json({ message: "There is no recipe with given id" });
      } else {
        return res.json({ recipe: recipe });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  // Returns one recipe specified by name param with all its information 
  app.get("/get_recipes_by_name", async (req, res) => {
    if (!req.query.name) {
      res.status(400);
      return res.json({ error: "Missing 'name' field" });
    }
    const name = String(req.query.name);
    try {
      const recipes = await GetRecipesByName({ name });
      if (recipes === null) {
        return res.json({ message: "There are no recipes with given name" });
      } else {
        return res.json({ recipes: recipes });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  // Creates a new recipe entry in DB
  app.post("/create_recipe", async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        return res.json({ error: "Missing 'name' field" });
    }
    if (!req.body.ingredients || req.body.ingredients.length <= 0) {
        res.status(400);
        return res.json({ error: "Missing 'ingredients' field or did not supply any ingredients" });
    }

    let newRecipe = formatRecipe(req.body);

    try {
      const recipe = await CreateRecipe(newRecipe);
      return res.json({ message: "Recipe created", recipe: recipe });
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409);
        return res.json({ error: "Recipe with given name already existed" });
      } else {
        res.status(500);
        return res.json({ error: "Internal server error" });
      }
    }
  });

  // Filters recipe list by categories, ingredients, and/or meal type
  app.post("/filter_recipes", async (req, res) => {
    let filterQuery = createFilterQuery(req.body);

    // If no filtering parameters supplied, return list of all recipes with no filtering, otherwise filter recipe table and return result
    try {
        let recipes: IRecipes[];
        if (filterQuery.length > 0) {
            recipes = await FilterRecipes({filterQuery});
        } else {
            recipes = await GetRecipes();
        }
        return res.json({ count: recipes.length, recipes: recipes });
    } catch (error: any) {
        res.status(500);
        return res.json({ error: "Internal server error" });
    }
  });

  // Update recipe associated with id param with update param information
  app.put("/update_recipe_by_id", async (req, res) => {
    if (!req.body.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }

    if (!req.body.updates) {
        res.status(400);
        return res.json({ error: "Missing 'updates' field" });
    }

    const updates = formatRecipe(req.body.updates);
    const id = String(req.body.id);
    try {
      let recipe = await UpdateRecipeID({ id,  updates});
      if (recipe === null) {
        return res.json({ message: "There is no recipe with given id or no update information supplied" });
      } else {
        return res.json({ message: "Recipe information updated", recipe: recipe });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  })

  // Update recipe associated with name param with update param information
  app.put("/update_recipe_by_name", async (req, res) => {
    if (!req.body.name) {
      res.status(400);
      return res.json({ error: "Missing 'name' field" });
    }

    if (!req.body.updates) {
        res.status(400);
        return res.json({ error: "Missing 'updates' field" });
    }

    const updates = formatRecipe(req.body.updates);
    const name = String(req.body.name);
    try {
      const recipe = await UpdateRecipeName({ name,  updates});
      if (recipe === null) {
        return res.json({ message: "There is no recipe with given name or no update information supplied" });
      } else {
        return res.json({ message: "Recipe information updated", recipe: recipe });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  })

  // Delete recipe associated with id param from DB
  app.delete("/delete_recipe_by_id", async (req, res) => {
    if (!req.query.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    const id = String(req.query.id);
    try {
      const recipe = await DeleteRecipeID({ id });
      if (recipe === null) {
        return res.json({ message: "There is no recipe with given id" });
      } else {
        return res.json({ message: "Recipe deleted", recipe: recipe });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

// Delete recipe associated with name param from DB
app.delete("/delete_recipe_by_name", async (req, res) => {
    if (!req.query.name) {
      res.status(400);
      return res.json({ error: "Missing 'name' field" });
    }
    const name = String(req.query.name);
    try {
      const recipe = await DeleteRecipeName({ name });
      if (recipe === null) {
        return res.json({ message: "There is no recipe with given name" });
      } else {
        return res.json({ message: "Recipe deleted", recipe: recipe });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  
  app.listen(PORT, () => {
    console.log(`️[server]: Server is running at http://localhost:${PORT}`);
  });
});

// Format recipe information from request into format for recipe table schema
function formatRecipe(recipeObj: RecipeCreate) {
    let recipe = {} as IRecipes;

    if (recipeObj.name) {
      recipe.name = String(recipeObj.name);
    }
    
    if (recipeObj.description) {
        recipe.description = String(recipeObj.description);
    }
    if (recipeObj.prep_time) {
        recipe.prep_time = Number(String(recipeObj.prep_time));
    } 
    if (recipeObj.cook_time) {
        recipe.cook_time = Number(String(recipeObj.cook_time));
    }
    if (recipeObj.servings) {
        recipe.servings = Number(String(recipeObj.servings));
    }
    if (recipeObj.calories) {
        recipe.calories = Number(String(recipeObj.calories));
    }
    formatYield(recipe, recipeObj);

    formatMealType(recipe, recipeObj);
    formatDietaryCategories(recipe, recipeObj);

    if (recipeObj.dish_type) {
        recipe.dish_type = String(recipeObj.dish_type);
    }

    formatIngredientList(recipe, recipeObj);

    formatRecipeSteps(recipe, recipeObj);

    return recipe;
} 

// Format yield nested field of recipe object using request information
function formatYield(recipe: IRecipes, recipeObj: RecipeCreate) {

    // Only add yield information to recipe object if both the amount and unit are supplied
    if (recipeObj.yield_amount && recipeObj.yield_unit) {
        let yield_amount = Number(String(recipeObj.yield_amount));
        let yield_unit = String(recipeObj.yield_unit);
        recipe.yield = {yield_amount: yield_amount, yield_unit: yield_unit};
    }
}

// Format meal type nested field of recipe object using request information
function formatMealType(recipe: IRecipes, recipeObj: RecipeCreate) {
    // Defaultly set all meal types equal to false
    recipe.meal_type = {breakfast: false, lunch: false, dinner: false, appetizer: false, side_dish: false, snack: false, dessert: false};
    
    // For all meal types passed in, set the meal type in the recipe object to true
    if (recipeObj.meal_type) {
        const mealArray = recipeObj.meal_type;
        for (let mealType of mealArray) {
            recipe.meal_type[mealType] = true;
        }
    } 
}

// Format dietary categories nested field of recipe object using request information
function formatDietaryCategories(recipe: IRecipes, recipeObj: RecipeCreate){
    // Defaultly set all dietary categories equal to false
    recipe.dietary_categories = {
        low_sodium: false, 
        low_fat: false, 
        low_carb: false, 
        gluten_free: false, 
        dairy_free: false, 
        nut_free: false, 
        low_sugar: false, 
        low_calories: false, 
        all_natural: false, 
        vegetarian: false, 
        vegan: false, 
        healthy: false
    }
    // For all dietary categories passed in, set the dietary category in the recipe object to true
    if (recipeObj.dietary_categories) {
        const dietaryCategories = recipeObj.dietary_categories;

        for (let category of dietaryCategories) {
            recipe.dietary_categories[category] = true;
        }
    }
}

// Format ingredient list nested field of recipe object using request information
function formatIngredientList(recipe: IRecipes, recipeObj: RecipeCreate){
    if (recipeObj.ingredients) {
        let ingredients = recipeObj.ingredients;
        let ingredientList: IIngredients[] = [];
        for (let ingredient of ingredients ){
            let ingredientObj = {} as IIngredients;

            // Do not add ingredient if it is not supplied a name, otherwise add ingredient name to ingredient object
            if (!ingredient.ingredient_name) {
                continue;
            } else {
                ingredientObj.ingredient_name = ingredient.ingredient_name;
            }
            // Only add a measurement amount if a measurment unit is also supplied to ingredient object
            if (ingredient.measurement_amount && ingredient.measurement_unit) {
                ingredientObj.ingredient_measurement = {measurement_amount: ingredient.measurement_amount, measurement_unit: ingredient.measurement_unit} 
            }
            // Add ingredient type to ingredient object
            if (ingredient.ingredient_type) {
                ingredientObj.ingredient_type = ingredient.ingredient_type
            }
            ingredientList.push(ingredientObj);
        } 
        if (ingredientList.length > 0) {
            recipe.ingredients =  ingredientList as [IIngredients];
        }
    }
}

// Format recipe steps nested field of recipe object using request information
function formatRecipeSteps(recipe: IRecipes, recipeObj: RecipeCreate) {
    if (recipeObj.recipe_steps) {
        let recipe_steps = recipeObj.recipe_steps;
        let recipeSteps: IRecipeSteps[] = [];

        for (let i = 1; i <= recipe_steps.length; i++) {
            let recipeStep = {} as IRecipeSteps;
            recipeStep.step_number = i;
            recipeStep.step_description = recipe_steps[i-1];
            recipeSteps.push(recipeStep)
        }

        if (recipeSteps.length > 0) {
            recipe.recipe_steps =  recipeSteps as [IRecipeSteps];
        }
    }
}

// Create mongoDB filtering query using the filtering params in request to filter recipe table
function createFilterQuery(filterObj: RecipeFilter) {
    let categoryQuery= {}
    let mealTypeQuery= {}
    let ingredientIncludeQuery={}
    let ingredientExcludeQuery={}
    let filterQuery = [];

    // Create category filter array if category filtering object supplied in request
    if (filterObj.filter_category && filterObj.filter_category.length > 0) {
        let categoryObjects = filterObj.filter_category
        let categoryQueryArr = [];
        for (let category of categoryObjects) {
            let key = "dietary_categories."+category;
            let categoryObj = {[key]: true};
            categoryQueryArr.push(categoryObj);
        }
        categoryQuery = { $and: categoryQueryArr}
        filterQuery.push(categoryQuery);
    }

    // Create meal type filter array if category filtering object supplied in request
    if (filterObj.filter_meal_type && filterObj.filter_meal_type.length > 0) {
        let mealTypeObjects = filterObj.filter_meal_type
        let mealTypeQueryArr = [];
        for (let meal_type of mealTypeObjects) {
            let key = "meal_type."+meal_type;
            let mealTypeObj = {[key]: true};
            mealTypeQueryArr.push(mealTypeObj);
        }
        mealTypeQuery = { $and: mealTypeQueryArr}
        filterQuery.push(mealTypeQuery);
    }

    // Create ingredient filter list that either checks if a recipe's ingredient list contains at least one of the filtering ingredients, 
    // or if a recipe's ingredient list contains all of the filtering ingredients
    if (filterObj.filter_ingredient_contains && filterObj.filter_ingredient_contains.length > 0) {
        ingredientIncludeQuery = { "ingredients.ingredient_name": { $in:  filterObj.filter_ingredient_contains} }
        filterQuery.push(ingredientIncludeQuery);
    }else if (filterObj.filter_ingredient_only && filterObj.filter_ingredient_only.length > 0) {
        ingredientIncludeQuery = { "ingredients.ingredient_name": { $all:  filterObj.filter_ingredient_only} }
        filterQuery.push(ingredientIncludeQuery);
    }

    // Create ingredient filter list that checks if a recipe's ingredient list does not contain any of the filtering ingredients
    if (filterObj.filter_ingredient_exclude && filterObj.filter_ingredient_exclude.length > 0) {
        ingredientExcludeQuery = { "ingredients.ingredient_name": { $nin:  filterObj.filter_ingredient_exclude} };
        filterQuery.push(ingredientExcludeQuery);
    }

    return filterQuery;
}