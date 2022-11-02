import express from "express";
import myDB from "../db/myMongoDB.js";

import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolder = path.join(__dirname, "public");

// Overall, it looks great to me, keep it up!

router.get("/titles", async (req, res) => {
  res.json(await myDB.getMediaTitle());
});

router.post("/review", async (req, res) => {
  console.log("review user ", req.session.user);
  if (req.session.user === undefined || req.session.user === null) {
    res.redirect("../?review=false");
    return;
  }

  const media = req.body;
  const postMedia = {
    title: media.title,
    author: media.author,
    review: media.review,
    user: req.session.user,
  };

  await myDB.postMediaReview(postMedia);
  res.redirect("../?review=true");
});

router.get("/fetchReviews", async (req, res) => {
  if (req.session.user === undefined || req.session.user === null) {
    res.redirect("../?fetchreview=false");
    res.end();
    return;
  }
  const user = { user: req.session.user };
  res.json(await myDB.fetchMediaReviews(user));
});

/* 
router.post("/add", async (req, res) => {
  const media = req.body;
  console.log("media user: ", media);
  if (req.session.user === null) {
    res.redirect("../?upload=false");
    return;
  }

  const imagePath = imagePath.resolve(imageFolder, "a.png");
  const newMedia = {
    uploader: req.session.user,
    title: media.title,
    author: media.author,
    description: media.description,
    cover: imagePath,
  };

  const controller = new AbortController();
  const { signal } = controller;
  writeFile(imagePath, media.cover, { signal }, (err) => {
    res.redirect("../?upload=false");
  });
  controller.abort();
});
*/

export default router;
