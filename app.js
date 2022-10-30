import express from "express";
import logger from "morgan";
import { fileURLToPath } from "url";
// import { dirname } from "path";
import path from "path";
import session from "express-session";
import router from "./routes/routes.js";
// import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app
  .use(
    session({
      secret: "John Hate",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60000 /*, secure: true*/ },
    })
  )
  .use(logger("dev"))
  .use(express.json()) //express version 4.16 or greater
  .use(express.urlencoded({ extended: false }))
  .use(router)
  // .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")));

export default app;
