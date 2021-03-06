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
	ingredients?: IngredientCreate[],
    ingredients_extra?: IngredientCreate[],
	recipe_steps?: string[]
}

// Interface for ingredient recipe create list
export interface IngredientCreate {
    ingredient_name: string, 
    measurement_amount: number, 
    measurement_unit: string, 
    ingredient_type: string
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
    ingredients_extra : [IIngredients],
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