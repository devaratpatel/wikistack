const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

router.get("/", (req, res) => {
  res.send("page get /wiki");
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = router;
