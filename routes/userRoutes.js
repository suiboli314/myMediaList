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
    req.session.save(err => {
      if (err) return next(err);
      res.redirect("/?msg=authenticated");
    });
    
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
