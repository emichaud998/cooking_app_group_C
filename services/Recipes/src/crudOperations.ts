import { FilterQuery, CreateQuery, UpdateQuery, ObjectId } from "mongoose";
import Recipe, { IRecipes } from "./models/recipesModels";

// Get recipe information for one recipe by ID from DB
export async function GetRecipeByID({
    id,
}: FilterQuery<IRecipes>): Promise<IRecipes | null> {
  return Recipe.findOne(
      {_id: id}
    )
    .then((data: IRecipes | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Get all recipe information from DB for recipes that contain the given name
export async function GetRecipesByName({
  name,
}: FilterQuery<IRecipes>): Promise<IRecipes[]> {
  return Recipe.find(
    { name: { $regex: String(name), $options: 'i'}}
  )
  .then((data: IRecipes[]) => {
    return data;
  })
  .catch((error: Error) => {
    throw error;
  });
}

// Get all recipe information from DB
export async function GetRecipes(): Promise<IRecipes[]> {
  return Recipe.find({})
    .then((data: IRecipes[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Create new recipe entry in DB 
export async function CreateRecipe(
  recipeObj: CreateQuery<IRecipes>): Promise<IRecipes> {
  return Recipe.create(recipeObj)
    .then((data: IRecipes) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Update a recipe with given ID with new update information
export async function UpdateRecipeID({
  id,
  updates,
}: UpdateQuery<IRecipes>): Promise<IRecipes | null> {
  return Recipe.findOneAndUpdate(
    { _id: id },
    updates,
    { new: true }
  )
    .then((data: IRecipes | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Update a recipe with given exact name with new update information
export async function UpdateRecipeName({
  name,
  updates,
}: UpdateQuery<IRecipes>): Promise<IRecipes | null> {
  return Recipe.findOneAndUpdate(
    { name: name },
    updates,
    { new: true }
  )
    .then((data: IRecipes | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Update a recipe with given exact name with new update information
export async function UpdateRecipeIngredient({
  id, 
  setter, 
  filters
}: UpdateQuery<IRecipes>): Promise<IRecipes | null> {
  return Recipe.findOneAndUpdate(
    { _id: id },
    setter,
    { arrayFilters: filters, new: true }
  )
    .then((data: IRecipes | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Delete recipe entry with given ID from DB
export async function DeleteRecipeID({
  id,
}: FilterQuery<IRecipes>): Promise<IRecipes | null> {
  return Recipe.findOneAndDelete({ _id: id })
    .then((data: IRecipes | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Delete recipe entry with given name from DB
export async function DeleteRecipeName({
  name,
}: FilterQuery<IRecipes>): Promise<IRecipes | null> {
  return Recipe.findOneAndDelete({ name: name })
    .then((data: IRecipes | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

// Filter recipes table with given filter query
export async function FilterRecipes({
  filterQuery,
}: FilterQuery<IRecipes>): Promise<IRecipes[]> {
  console.log(filterQuery)
  return Recipe.find(
    { $and: filterQuery}
  )
  .then((data: IRecipes[]) => {
    return data;
  })
  .catch((error: Error) => {
    throw error;
  });
}
