import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import {
  CreateUser,
  GetUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
} from "./curd/User";

const app = express();
const PORT = 8000;

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DATABASE}`;
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

  app.get("/get_users", async (req, res) => {
    try {
      const users = await GetUsers();
      res.json({ count: users.length, users: users });
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  app.get("/get_user_by_email", async (req, res) => {
    if (!req.query.email) {
      res.status(400);
      return res.json({ error: "Missing 'email' field" });
    }
    const email = String(req.query.email);
    try {
      const user = await GetUser({ email });
      if (user === null) {
        return res.json({ message: "There is no user with given email" });
      } else {
        return res.json({ users: user });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.post("/create_user", async (req, res) => {
    if (!req.query.email) {
      res.status(400);
      return res.json({ error: "Missing 'email' field" });
    }
    if (!req.query.userName) {
      res.status(400);
      return res.json({ error: "Missing 'userName' field" });
    }
    const email = String(req.query.email);
    const userName = String(req.query.userName);
    try {
      const user = await CreateUser({
        email: email,
        userName: userName,
      });
      return res.json({ message: "User created", user: user });
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409);
        return res.json({ error: "User with given email already existed" });
      } else {
        res.status(500);
        return res.json({ error: "Internal server error" });
      }
    }
  });

  app.put("/update_user_by_email", async (req, res) => {
    if (!req.query.email) {
      res.status(400);
      return res.json({ error: "Missing 'email' field" });
    }
    if (!req.query.userName) {
      res.status(400);
      return res.json({ error: "Missing 'userName' field" });
    }
    const email = String(req.query.email);
    const userName = String(req.query.userName);
    try {
      const user = await UpdateUser({ email, userName });
      if (user === null) {
        return res.json({ message: "There is no user with given email" });
      } else {
        return res.json({ message: "User information updated", users: user });
      }
    } catch (error: any) {
      res.status(500);
      return res.json({ error: "Internal server error" });
    }
  });

  app.delete("/delete_user_by_email", async (req, res) => {
    if (!req.query.email) {
      res.status(400);
      return res.json({ error: "Missing 'email' field" });
    }
    const email = String(req.query.email);
    try {
      const user = await DeleteUser({ email });
      if (user === null) {
        return res.json({ message: "There is no user with given email" });
      } else {
        return res.json({ message: "User deleted", users: user });
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
