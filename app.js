import express from "express";
import logger from "morgan";
import { fileURLToPath } from "url";
// import { dirname } from "path";
import path from "path";
import session from "express-session";
import userRouter from "./routes/userRoutes.js";
import mediaRouter from "./routes/mediaRoutes.js";
// import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

let sess = {
  secret: "John Hate",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 0.5 * 60 * 60 * 1000 },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app
  .use(session(sess))
  .use(logger("dev"))
  .use(express.json()) //express version 4.16 or greater
  .use(express.urlencoded({ extended: false }))
  // .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter).use("/media", mediaRouter);

export default app;

// Your projects is well put together! Looks great!
