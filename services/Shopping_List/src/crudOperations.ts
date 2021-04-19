import { FilterQuery } from "mongoose";
import ShoppingList, { IIngredientsList, IShoppingList, updateCommands } from "./models/shoppingListModels";

// Get all shopping list information for a user by their user id
export async function GetShoppingListsByUserID({
    user_id
}: FilterQuery<IShoppingList>): Promise<IShoppingList[] | null> {
  return ShoppingList.find(
      {user_id: user_id}
    )
    .then((data: IShoppingList []) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Delete a shopping list with given ID for a user from DB
export async function DeleteShoppingList({
  id, user_id
}: FilterQuery<IShoppingList>): Promise<IShoppingList | null> {
  return ShoppingList.findOneAndDelete( 
    { _id: id, user_id: user_id }
  )
    .then((data: IShoppingList | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Get shopping list information for a user by the shopping list's id
export async function GetShoppingListByID({
  id, user_id
}: FilterQuery<IShoppingList>): Promise<IShoppingList | null> {
return ShoppingList.findOne(
    {_id: id, user_id: user_id}
  )
  .then((data: IShoppingList | null) => {
    return data;
  })
  .catch((error: Error) => {
    throw error;
  });
}

// Add new ingredient with ingredient info to user's shopping list with given id
export async function AddIngredientToList(
  id: string, user_id: string, newIngredient: IIngredientsList
): Promise<IShoppingList | null> {
  return ShoppingList.findOneAndUpdate( 
    { _id: id, user_id: user_id}, 
    { $push: {ingredient_list: newIngredient } },
    { new: true }
  )
    .then(async (data: IShoppingList | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Create a new shopping list for a user
export async function CreateNewShoppingList({
  user_id, shopping_list_name
}: FilterQuery<IShoppingList>): Promise<IShoppingList> {
  return ShoppingList.create({user_id: user_id, shopping_list_name: shopping_list_name, date_created: new Date()})
    .then((data: IShoppingList) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Delete ingredient entry with given ingredient ID from user's shopping list with given ID
export async function DeleteIngredientFromList({
  id, user_id, ingredient_id
}: FilterQuery<IShoppingList>): Promise<IShoppingList | null> {
  return ShoppingList.findOneAndUpdate( 
    { _id: id, user_id: user_id }, 
    { $pull: { ingredient_list: { _id: ingredient_id} }},
    { new: true }
  )
    .then((data: IShoppingList | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Update an ingredient with given ingredient ID in a user's shopping list with new ingredient update information
export async function UpdateShoppingListIngredient(
  id: string,
  user_id: string,
  ingredient_id: string,
  updateCommands: updateCommands): Promise<IShoppingList | null> {
  return ShoppingList.findOneAndUpdate(
    { "_id": id, "user_id": user_id, "ingredient_list._id": ingredient_id}, 
    { "$set": updateCommands},
    { new: true }
  )
    .then((data: IShoppingList | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}