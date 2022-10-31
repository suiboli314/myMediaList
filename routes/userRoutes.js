import express from "express";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  console.log("POST signin");
  const user = req.body;
  console.log("signin user: ", user);

  // TODO check that we got the correct info

  if (await myDB.authenticate(user)) {
    // store user information in session, typically a user id
    req.session.user = user.user;

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect("/?auth=true");
    });
  } else {
    res.redirect("/?auth=false");
  }
});

router.post("/signup", async (req, res) => {
  const user = req.body;
  console.log("create user %s", user);

  if (user.password === user.match) {
    const newUser = {
      user: user.user,
      password: user.password,
    };
    const mongoRes = await myDB.signup(newUser);
    console.log("User created: ", mongoRes);
    res.redirect("/?signup=true");
  } else {
    res.redirect("/?signup=false");
  }
});

router.post("/resetPass", async (req, res) => {
  const user = req.body;
  console.log("create user %s", user);
  if (req.session.user === null || user.password !== user.match) {
    res.redirect("/?reset=false");
    return;
  }

  const resetUser = {
    user: req.session.user,
    password: user.password,
  };
  const mongoRes = await myDB.resetPass(resetUser);
  res.redirect("/?reset=true");
});

router.get("/deleteThisUser", async (req, res) => {
  const user = {
    user: req.session.user,
  };
  await myDB.deleteUser(user);
  res.redirect("/?userDeleted=true");
});

router.get("/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

router.get("/signout", (req, res, next) => {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save((err) => {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

// /**
//  * about next:
//  * https://stackoverflow.com/a/10695714
//  * Access the session as req.session
//  */
// router.get("/", (req, res /* , next */) => {
//   if (req.session.views) {
//     req.session.views++;

//     res.write("<p>views: " + req.session.views + "</p>");
//     res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
//     console.log(req.session.views);
//   } else {
//     req.session.views = 1;
//   }
// });

export default router;
