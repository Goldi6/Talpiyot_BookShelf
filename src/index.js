const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { viewsPath } = require("./helpers/handlebars.js");
// const { engine, create } = require("express-handlebars");

const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../public");

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

app.use(authRouter);
app.use(bookRouter);
app.use(cartRouter);
app.use(adminRouter);
app.use(pathRouter);

const {
  clientErrorHandler,
  errorHandler,
  errorLogger,
} = require("./middleware/errorHandlers.js");

app.use(errorLogger);
app.use(clientErrorHandler);
app.use(errorHandler);

////
////
const port = process.env.PORT;

app.listen(port, () => {
  console.log("connected on port: ", port);
});
