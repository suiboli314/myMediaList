import express from "express";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("POST login");
  const user = req.body;
  console.log("login user: ", user);

  // TODO check that we got the correct info

  if (await myDB.authenticate(user)) {
    req.session.user = user.user;

    res.redirect("/?msg=authenticated");
  } else {
    res.redirect("/?msg=error authenticating");
  }
});

router.post("/signup", async (req, res) => {
  const user = req.body;
  console.log("create user", user);

  const newUser = {
    user: user.name,
    password: user.password,
  };

  const mongoRes = await myDB.createPlayer(newUser);
  console.log("User created", mongoRes);

  res.redirect("/?msg=signedup");
});

router.get("/user", (req, res) => {
  res.send("User will be here!");
});

router.get("/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

export default router;
