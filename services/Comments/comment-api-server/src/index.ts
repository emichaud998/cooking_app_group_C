import express from "express";
import mongoose from "mongoose";
import {
  GetCommentById,
  GetCommentByPostId,
  GetCommentByUserId,
  CreateComment,
  UpdateCommentById,
  DeleteCommentById,
} from "./curd/Comment";

const app = express();

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

let num = 0;
let logger = function (req: any, res: any, next: any) {
  num++;
  console.log(`Total request: ${num}`);
  next();
};

app.use(logger);
app.use(express.json());
const PORT = 8000;

const uri = `mongodb://mongo1:27017,mongo2:27017,mongo3:27017,mongo4:27017,mongo5:27017/${process.env.MONGO_DATABASE}?replicaSet=comment_replica&readPreference=nearest`;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "[server] connection error:"));

db.once("open", () => {
  console.log("[server] database connected!");

  app.get("/api/comments/get_comment", async (req, res) => {
    if (!req.query.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    const id = String(req.query.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "There is no comment with given id" });
    }
    try {
      const comment = await GetCommentById({ id });
      if (comment === null) {
        return res.json({ message: "There is no comment with given id" });
      } else {
        return res.json({ comment: comment });
      }
    } catch (error: any) {
      console.log(error);
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.get("/api/comments/get_comments_by_post_id", async (req, res) => {
    if (!req.query.postId) {
      res.status(400);
      return res.json({ error: "Missing 'postId' field" });
    }
    const postId = String(req.query.postId);
    try {
      const comments = await GetCommentByPostId(postId);
      if (comments === null) {
        return res.json({ message: "There is no comment with given postId" });
      } else {
        return res.json({ comments: comments });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.get("/api/comments/get_comments_by_user_id", async (req, res) => {
    if (!req.query.userId) {
      res.status(400);
      return res.json({ error: "Missing 'userId' field" });
    }
    const userId = String(req.query.userId);
    try {
      const comments = await GetCommentByUserId(userId);
      if (comments === null) {
        return res.json({ message: "There is no comment with given userId" });
      } else {
        return res.json({ comments: comments });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.post("/api/comments/create_comment", async (req, res) => {
    if (!req.body.userId) {
      res.status(400);
      return res.json({ error: "Missing 'userId' field" });
    }
    if (!req.body.postId) {
      res.status(400);
      return res.json({ error: "Missing 'postId' field" });
    }
    if (!req.body.commentText) {
      res.status(400);
      return res.json({ error: "Missing 'commentText' field" });
    }
    const userId = String(req.body.userId);
    const postId = String(req.body.postId);
    const commentText = String(req.body.commentText);
    try {
      const comment = await CreateComment({
        userId: userId,
        postId: postId,
        commentText: commentText,
      });
      return res.json({ message: "Comment created", comment: comment });
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.put("/api/comments/update_comment", async (req, res) => {
    if (!req.body.userId) {
      res.status(400);
      return res.json({ error: "Missing 'userId' field" });
    }
    if (!req.body.postId) {
      res.status(400);
      return res.json({ error: "Missing 'postId' field" });
    }
    if (!req.body.commentText) {
      res.status(400);
      return res.json({ error: "Missing 'commentText' field" });
    }
    if (!req.body.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    const id = String(req.body.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "There is no comment with given id" });
    }
    const userId = String(req.body.userId);
    const postId = String(req.body.postId);
    const commentText = String(req.body.commentText);
    try {
      const comment = await UpdateCommentById(id, userId, postId, commentText);
      return res.json({ message: "Comment updated", comment: comment });
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.delete("/api/comments/delete_user_by_id", async (req, res) => {
    if (!req.query.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    const id = String(req.query.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "There is no comment with given id" });
    }
    try {
      const comment = await DeleteCommentById({ id });
      if (comment === null) {
        return res.json({ message: "There is no comment with given id" });
      } else {
        return res.json({ message: "Comment deleted", users: comment });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });
  app.listen(PORT, () => {
    console.log(`️[server]: Server is running at http://localhost:${PORT}`);
  });
});
