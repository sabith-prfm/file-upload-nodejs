const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

global.__basedir = __dirname;

var corsOptions = {
  origin: process.env.BASEURL
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});