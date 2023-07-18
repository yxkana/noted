

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5000/notes",
  "http://localhost:5173/notes",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
];

import routes from "./src/routes/index.js";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import uniqueString from "unique-string";

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
const app = express();
app.use(credentials);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", routes);


const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(404);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.email = decoded.email;
    next();
  });
};


mongoose.connect("mongodb+srv://kavalekdaniel01:"+process.env.DB_PASSWORD+"@cluster0.xwtmbma.mongodb.net/?retryWrites=true&w=majority");

const noteSchema = new Schema({
  title: String,
  content: String,
  priority: String,
  tags: Array,
  status: String,
  creator: String,
});

const projectSchema = new Schema({
  title: String,
  desc: String,
  team: Array,
  tasks: Array,
  todoStatus: Number,
  progressStatus: Number,
  completeStatus: Number,
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: true,
  },
  refreshToken: String,
  notes: Array,
  friendList: Array,
  username: String,
  projectList: Array,
});

const NOTE = mongoose.model("NOTES", noteSchema);
const USER = mongoose.model("USERS", userSchema);
const PROJECT = mongoose.model("PROJECT", projectSchema);



app.listen("5000", function () {
  console.log("connect succ.");
});
