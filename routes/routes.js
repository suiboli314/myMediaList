import express from "express";

import myDB from "../db/myMongoDB.js";

const router = express();

router.get("/login", async (req, res) => {
  const user = req.body;
  console.log("POST login", user);

  // TODO check that we got the correct info

  if (await myDB.authenticate(user)) {
    req.session.user = user.user;

    res.redirect("/?msg=authenticated");
  } else {
    res.redirect("/?msg=error authenticating");
  }
});

router.get("/user", (req, res) => {
  res.send("User will be here!");
});

router.get("/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

export default router;
