const express = require("express");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoConnect = require("./database/mongoose");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const bookRoutes = require("./routes/books");
const Error404 = require("./errors/404");
const vars = require("./utils/vars");
const PORT = vars.port || 4044
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRoutes);
app.use(homeRoutes);
app.use(bookRoutes);

app.use(Error404);

mongoConnect()
  .then(() => {
    console.log(mongoose.connection.readyState);
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
