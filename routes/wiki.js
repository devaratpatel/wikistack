const express = require("express");
const router = express.Router()



router.get("/", (req, res) => {

res.send("page get /wiki");
});

router.post("/", (req, res) => {

  res.send("page post /wiki");
  });

  router.get("/add", (req, res) => {

    res.send("page get /wiki/add");
    });

module.exports = router;
