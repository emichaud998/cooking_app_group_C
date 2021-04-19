import mongoose, { Schema, Document } from "mongoose";

// Interface defining the structure of a shopping list creation request
export interface ShoppingListCreate {
	user_id: string,
    shopping_list_name: string, 
    date_created: string
}

// Interface defining the structure of a request to add an ingredient to a shopping list
export interface ShoppingListAddIngredient {
	id: string,
    ingredient_name: string, 
    amount: number, 
    units: string, 
    recipe_id?: string,
    ingredient_extra: boolean
}

// Interface defining the structure of a request to update an ingredient in a shopping list
export interface ShoppingListUpdateIngredient{
    user_id: string,
	id: string,
    ingredient_id: string, 
	amount: number, 
	units: string, 
	recipe_id?: string,
    ingredient_extra: boolean
}

export interface FilteringQuery{
    "ingredient_list.$.ingredient_measurement.measurement_amount"?: number,
    "ingredient_list.$.ingredient_measurement.measurement_unit"?: string,
    "ingredient_list.$.recipe_id"?: string,
    "ingredient_list.$.ingredient_extra"?: boolean
}

// Interface defining the structure of the shopping list schema
export interface IShoppingList extends Document {
    user_id?: string,
    date_created: Date,
    shopping_list_name: string,
    ingredient_list: [IIngredientsList]
}

// Interface defining the structure of the shopping list ingredient list schema
export interface IIngredientsList extends Document {
    ingredient_name: string,
    ingredient_measurement: {
        measurement_amount?: number,
        measurement_unit?: string
    },
    recipe_id?: string,
    ingredient_extra: boolean
}

// Shopping list ingredients list sub document schema
const IngredientsSchema: Schema  = new Schema({
    ingredient_name: {type: String, required: true},
    ingredient_measurement: {
        measurement_amount: {type: Number},
        measurement_unit: {type: String},
    },
    ingredient_extra: {type: Boolean},
    recipe_id: {type: String}
});

// Shopping list table schema
const ShoppingListSchema: Schema = new Schema({
  user_id: { type: String, required: true},
  date_created: {type: Date},
  shopping_list_name: {type: String},
  ingredient_list: [IngredientsSchema]
});

export default mongoose.model<IShoppingList>("ShoppingList", ShoppingListSchema);