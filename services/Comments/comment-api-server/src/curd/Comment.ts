import { FilterQuery, CreateQuery, UpdateQuery } from "mongoose";
import Comment, {
  IComment,
  PostIdSchema,
  UserIdSchema,
} from "../models/Comment";

export async function GetCommentById({
  id,
}: FilterQuery<IComment>): Promise<IComment | null> {
  return Comment.findOne({
    _id: id,
  })
    .then((data: IComment | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function GetCommentByPostId(
  postId: string
): Promise<IComment[] | null> {
  return Comment.find({ postId: postId })
    .then((data: IComment[] | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function GetCommentByUserId(
  userId: string
): Promise<IComment[] | null> {
  return Comment.find({ userId: userId })
    .then((data: IComment[] | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function CreateComment(
  create: CreateQuery<IComment>
): Promise<IComment> {
  return Comment.create(create)
    .then((data: IComment) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function UpdateCommentById(
  id: String,
  userId: String,
  postId: String,
  commentText: String
): Promise<IComment | null> {
  const update = new Comment({ userId, postId, commentText });
  return Comment.findOneAndUpdate({ _id: id }, update, { new: true })
    .then((data: IComment | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function DeleteCommentById({
  id,
}: FilterQuery<IComment>): Promise<IComment | null> {
  return Comment.findOneAndDelete({ _id: id })
    .then((data: IComment | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
