import express from "express";
import mongoose from "mongoose";
import { CreateRecipe, DeleteRecipeID, DeleteRecipeName, GetRecipeByID, GetRecipes, GetRecipesByName, FilterRecipes, UpdateRecipeID, UpdateRecipeName } from "./crud";
import { IRecipes, IIngredients, IRecipeSteps, RecipeCreate, RecipeFilter, RecipeUpdate } from "./models/recipes";

const app = express();
app.use(express.json());
const PORT = 8000;

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

  app.get("/get_recipes", async (req, res) => {
    try {
      const recipes = await GetRecipes();
      res.json({ count: recipes.length, recipes: recipes });
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

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

  app.get("/get_recipe_by_name", async (req, res) => {
    if (!req.query.name) {
      res.status(400);
      return res.json({ error: "Missing 'name' field" });
    }
    const name = String(req.query.name);
    try {
      const recipes = await GetRecipesByName({ name });
      if (recipes === null) {
        return res.json({ message: "There are no recipes containing given name" });
      } else {
        return res.json({ recipes: recipes });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.post("/create_recipe", async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        return res.json({ error: "Missing 'name' field" });
    }
    if (!req.body.ingredients_list || req.body.ingredients_list.length <= 0) {
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
        return res.json({ error: "User with given email already existed" });
      } else {
        res.status(500);
        return res.json({ error: "Internal server error" });
      }
    }
  });

  app.post("/filter_recipes", async (req, res) => {
    let categoryQuery= {}
    let mealTypeQuery= {}
    let ingredientIncludeQuery={}
    let ingredientExcludeQuery={}
    let filterQuery = [];

    if (req.body.filter_category && JSON.stringify(req.body.filter_category.length) !== `{}`) {
        let categoryObjects = req.body.filter_category
        let categoryQueryArr = [];
        for (let key in categoryObjects) {
            let value = categoryObjects[key];
            key = "dietary_categories."+key;
            let categoryObj = {[key]: value};
            categoryQueryArr.push(categoryObj);
        }
        categoryQuery = { $and: categoryQueryArr}
        filterQuery.push(categoryQuery);
    }

    if (req.body.meal_type && JSON.stringify(req.body.meal_type.length) !== `{}`) {
        let mealTypeObjects = req.body.meal_type
        let mealTypeQueryArr = [];
        for (let key in mealTypeObjects) {
            let value = mealTypeObjects[key];
            key = "meal_type."+key;
            let mealTypeObj = {[key]: value};
            mealTypeQueryArr.push(mealTypeObj);
        }
        mealTypeQuery = { $and: mealTypeQueryArr}
        filterQuery.push(mealTypeQuery);
    }

    if (req.body.filter_ingredient_contains && req.body.filter_ingredient_contains.length > 0) {
        ingredientIncludeQuery = { "ingredients.ingredient_name": { $in:  req.body.filter_ingredient_contains} }
        filterQuery.push(ingredientIncludeQuery);
    }else if (req.body.filter_ingredient_only && req.body.filter_ingredient_only.length > 0) {
        ingredientIncludeQuery = { "ingredients.ingredient_name": { $all:  req.body.filter_ingredient_only} }
        filterQuery.push(ingredientIncludeQuery);
    }

    if (req.body.filter_ingredient_exclude && req.body.filter_ingredient_exclude.length > 0) {
        ingredientExcludeQuery = req.body.filter_ingredient_exclude;
        filterQuery.push(ingredientExcludeQuery);
    }

    if (filterQuery.length < 0) {
        res.status(409);
        return res.json({ error: "Must pass in filter parameters" });
    }

    try {
      const recipes = await FilterRecipes({filterQuery});
      return res.json({ count: recipes.length, recipes: recipes });
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409);
        return res.json({ error: "User with given email already existed" });
      } else {
        res.status(500);
        console.log(error)
        return res.json({ error: "Internal server error" });
      }
    }
  });


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
      const recipe = await UpdateRecipeID({ id,  updates});
      if (recipe === null) {
        return res.json({ message: "There is no recipe with given id" });
      } else {
        return res.json({ message: "Recipe information updated", recipe: recipe });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  })

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
        return res.json({ message: "There is no recipe with given name" });
      } else {
        return res.json({ message: "Recipe information updated", recipe: recipe });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  })

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


function formatRecipe(recipeObj: RecipeCreate) {
    let recipe = {} as IRecipes;
    const name = String(recipeObj.name);
    recipe.name = name;
    
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
    formatYieldAmount(recipe, recipeObj);

    formatMealType(recipe, recipeObj);
    formatDietaryCategories(recipe, recipeObj);

    if (recipeObj.dish_type) {
        recipe.dish_type = String(recipeObj.dish_type);
    }

    formatIngredientList(recipe, recipeObj);

    formatRecipeSteps(recipe, recipeObj);

    return recipe;
} 

function formatYieldAmount(recipe: IRecipes, recipeObj: RecipeCreate) {
    if (recipeObj.yield_amount && recipeObj.yield_unit) {
        let yield_amount = Number(String(recipeObj.yield_amount));
        let yield_unit = String(recipeObj.yield_unit);
        recipe.yield = {yield_amount: yield_amount, yield_unit: yield_unit};
    }
}

function formatMealType(recipe: IRecipes, recipeObj: RecipeCreate) {
    recipe.meal_type = {breakfast: false, lunch: false, dinner: false, appetizer: false, side_dish: false, snack: false, dessert: false};
    if (recipeObj.meal_type) {
        const mealArray = recipeObj.meal_type;
        for (let mealType of mealArray) {
            recipe.meal_type[mealType] = true;
        }
    } 
}

function formatDietaryCategories(recipe: IRecipes, recipeObj: RecipeCreate){
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
    if (recipeObj.dietary_categories) {
        const dietaryCategories = recipeObj.dietary_categories;

        for (let category of dietaryCategories) {
            recipe.dietary_categories[category] = true;
        }
    }
}

function formatIngredientList(recipe: IRecipes, recipeObj: RecipeCreate){
    if (recipeObj.ingredients_list) {
        let ingredients = recipeObj.ingredients_list;
        let ingredientList: IIngredients[] = [];
        for (let ingredient of ingredients ){
            let ingredientObj = {} as IIngredients;
            if (!ingredient.ingredient_name) {
                continue;
            } else {
                ingredientObj.ingredient_name = ingredient.ingredient_name;
            }
            if (ingredient.measurement_amount && ingredient.measurement_unit) {
                ingredientObj.ingredient_measurement = {measurement_amount: ingredient.measurement_amount, measurement_unit: ingredient.measurement_unit} 
            }
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
