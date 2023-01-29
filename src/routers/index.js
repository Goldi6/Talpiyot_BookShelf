const express = require("express");

const {
  clientErrorHandler,
  internalErrorHandler,
  errorLogger,
} = require("../middleware/errorHandlers.js");

const authRouter = require("./authRouter");
const bookRouter = require("./bookRouter");
const cartRouter = require("./cartRouter");
const adminRouter = require("./adminRouter");
const pathRouter = require("./pathRouter");

const router = new express.Router();

router.use(authRouter);
router.use(bookRouter);
router.use(cartRouter);
router.use(adminRouter);
router.use(pathRouter);

router.use(errorLogger);
router.use(clientErrorHandler);
router.use(internalErrorHandler);

module.exports = router;
