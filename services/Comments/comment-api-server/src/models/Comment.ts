import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  userId: string;
  postId: string;
  commentText: string;
}

export interface PostIdSchema extends Document {
  postId: string;
}

export interface UserIdSchema extends Document {
  userId: string;
}

const CommentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  commentText: { type: String, required: true },
});

export default mongoose.model<IComment>("Comment", CommentSchema);
