const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");
const { db } = require("./models");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send(layout(""));
  } catch (error) {
    console.log(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

db.authenticate().then(() => {
  console.log("connected to the database");
});
const PORT = 8080;
app.listen(PORT, console.log("server is listening"));
