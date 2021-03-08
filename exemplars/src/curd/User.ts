import { FilterQuery, CreateQuery, UpdateQuery } from "mongoose";
import User, { IUser } from "../models/User";

export async function GetUser({
  email,
}: FilterQuery<IUser>): Promise<IUser | null> {
  return User.findOne({
    email: email,
  })
    .then((data: IUser | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function GetUsers(): Promise<IUser[]> {
  return User.find({})
    .then((data: IUser[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function CreateUser({
  email,
  userName,
}: CreateQuery<IUser>): Promise<IUser> {
  return User.create({
    email,
    userName,
  })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function UpdateUser({
  email,
  userName,
}: UpdateQuery<IUser>): Promise<IUser | null> {
  return User.findOneAndUpdate(
    { email: email },
    { userName: userName },
    { new: true }
  )
    .then((data: IUser | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function DeleteUser({
  email,
}: FilterQuery<IUser>): Promise<IUser | null> {
  return User.findOneAndDelete({ email: email })
    .then((data: IUser | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
