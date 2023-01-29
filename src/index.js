const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { viewsPath } = require("./helpers/handlebars.js");
const nocache = require("nocache");
require("./db/mongoose");

// const { engine, create } = require("express-handlebars");

const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../public");

const routerHandler = require("./routers/");

const app = express();

app.use(express.static(publicDirectoryPath, { extensions: ["html"] }));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(nocache());

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(routerHandler);

////
////
const port = process.env.PORT;

app.listen(port, () => {
  console.log("connected on port: ", port);
});
