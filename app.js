const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");
const { db, Page, User } = require("./models/index");
const wikiRouter = require("./routes/wiki");
const usersRouter = require("./routes/users");

const PORT = 8080;


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

app.use("/wiki", wikiRouter)

app.use("/users", usersRouter)


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const syncDataBase = async() => {
  await db.sync({force: true});
  // await Page.sync();
  // await User.sync();



  app.listen(PORT, console.log("server is listening"));

}

syncDataBase();





