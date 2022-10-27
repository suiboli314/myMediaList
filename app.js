import express from "express";
import path from "path";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
// import cookieParser from "cookie-parser";

// import indexRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app
  .use(
    session({
      secret: "John Hate",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000, secure: true },
    })
  )
  .use(logger("dev"))
  .use(express.json()) //express version 4.16 or greater
  .use(express.urlencoded({ extended: false }))
  // .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);


export default app;
