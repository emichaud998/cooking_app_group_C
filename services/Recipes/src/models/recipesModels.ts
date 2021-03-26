import mongoose, { Schema, Document } from "mongoose";

// Interface defining the structure of a recipe creation request
export interface RecipeCreate {
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
	ingredients?: [{ingredient_name: string, measurement_amount: number, measurement_unit: string, ingredient_type: string}],
	recipe_steps?: string[]
}

// Interface defining the structure of the recipe dietary categories field
interface Dietary_Categories {
    [index: string]: any;
    low_sodium?: boolean,
    low_fat?: boolean,
    low_carb?: boolean,
    gluten_free?: boolean,
    dairy_free?: boolean,
    nut_free?: boolean,
    low_sugar?: boolean,
    low_calories?: boolean,
    all_natural?: boolean,
    vegetarian?: boolean,
    vegan?: boolean,
    healthy?: boolean,
}

// Interface defining the structure of the recipe meal type field
interface Meal_Type {
    [index: string]: any;
    breakfast?: boolean,
    lunch?: boolean,
    dinner?: boolean,
    appetizer?: boolean,
    side_dish?: boolean,
    snack?: boolean,
    dessert?: boolean
}

// Interface defining the structure of a recipe filter request 
export interface RecipeFilter {
    filter_category: string[],
    filter_meal_type: string[],
	filter_ingredient_contains: string[],
	filter_ingredient_only: string[],
	filter_ingredient_exclude: string[]
}

// /Interface defining the structure of a recipe update request
export interface RecipeUpdate{
    id?: String,
    name?: String
    updates: RecipeCreate
}

// Interface defining the structure of the recipe schema
export interface IRecipes extends Document {
    name?: string,
    description: string,
    prep_time: number,
    cook_time: number,
    servings: number,
    calories: number,
    yield: {
        yield_amount?: number,
        yield_unit?: string
    },
    meal_type: Meal_Type,
    dietary_categories: Dietary_Categories,
    dish_type: string,
    ingredients: [IIngredients],
    recipe_steps: [IRecipeSteps]
}

// Interface defining the structure of the recipe ingredients schema
export interface IIngredients extends Document {
    ingredient_name: string,
    ingredient_measurement: {
        measurement_amount?: number,
        measurement_unit?: string
    },
    ingredient_type?: string
}

// Interface defining the structure of the recipe steps schema
export interface IRecipeSteps extends Document {
    step_number: number,
    step_description: string,
}

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

export default mongoose.model<IRecipes>("Recipe", RecipesSchema);