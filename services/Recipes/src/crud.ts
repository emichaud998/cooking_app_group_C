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

export async function DeleteRecipe({
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
