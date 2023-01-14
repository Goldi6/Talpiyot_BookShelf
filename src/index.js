const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
hbs.registerHelper("equalsTo", function (value, equalsTo) {
  return value == equalsTo;
});
hbs.registerHelper("getBirthday", function (fullDate) {
  return value == equalsTo;
});
// const { engine, create } = require("express-handlebars");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../public/templates/views");
const partialPath = path.join(__dirname, "../public/templates/partials");

const port = process.env.PORT;
require("./db/mongoose");
const authRouter = require("./routers/authRouter");
const bookRouter = require("./routers/bookRouter");
const cartRouter = require("./routers/cartRouter");
const adminRouter = require("./routers/adminRouter");
const pathRouter = require("./routers/pathRouter");

const app = express();

app.use(express.static(publicDirectoryPath, { extensions: ["html"] }));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialPath);

app.use(authRouter);
app.use(bookRouter);
app.use(cartRouter);
app.use(adminRouter);
app.use(pathRouter);

////
////

app.listen(port, () => {
  console.log("connected on port: ", port);
});
