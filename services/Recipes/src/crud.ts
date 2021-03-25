import { FilterQuery, CreateQuery, UpdateQuery, ObjectId } from "mongoose";
import Recipe, { IRecipes } from "./models/recipes";

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

export async function GetRecipes(): Promise<IRecipes[]> {
  return Recipe.find({})
    .then((data: IRecipes[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

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
/*
export async function UpdateRecipe({
  id,
  userName,
}: UpdateQuery<IRecipes>): Promise<IRecipes | null> {
  return Recipe.findOneAndUpdate(
    { email: email },
    { userName: userName },
    { new: true }
  )
    .then((data: IRecipes | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}*/

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
