//const { response, request } = require("express");
const express = require("express");
const User = require("../models/usersModel");
//const cookieParser = require("cookie-parser");

const router = express.Router();
const auth = require("../middleware/authUser");
const { verifyRequestFields } = require("../middleware/verifiers.js");
const FILTERS = ["tokens", "cart"];

////
router.post("/users/login", async (req, res, next) => {
  console.log("LOG");

  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmailAndPassword(email, password);
    if (!user) {
      return next(user);
    }
    //console.log(user);
    const token = await user.generateAuthToken();
    res.cookie("userToken", token);
    //console.log(token);
    res.send({ user, token });
  } catch (err) {
    next(err);
    // res.status(400).send({ status: 400, message: err.message });
  }
});
//new user
router.post(
  "/users",
  verifyRequestFields(User, FILTERS),
  async (req, res, next) => {
    console.log("HERE");
    const user = new User(req.body);
    console.log(user);
    try {
      await user.save();
      console.log("LOG");
      const token = await user.generateAuthToken();
      res.cookie("userToken", token);
      //TODO: remove token from response
      res.status(201).send({ user, token });
      //res.redirect("/user/books/search");
    } catch (err) {
      next(err);
    }
  }
);
//get user data
router.get("/users/get", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    err.status(500).send(err);
  }
});
router.patch(
  "/users/update",
  auth,
  verifyRequestFields(User, FILTERS),
  async (req, res, next) => {
    try {
      const _id = req.user._id;
      const user = await User.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return next(user);
      console.log(user);

      return res.send(user);
    } catch (err) {
      next(err);
    }
  }
);

//TODO: add delete button to the client
router.delete("/users", auth, async (req, res, next) => {
  try {
    await req.user.remove();
    res.send("user Deleted");
  } catch (err) {
    next(err);
  }
});

router.get("/users/logout", auth, async (req, res, next) => {
  console.log("LOGOUT");
  req.user.tokens = req.user.tokens.filter(
    (tokenDoc) => tokenDoc.token !== req.token
  );
  try {
    await req.user.save();
    res.clearCookie("userToken");
    // let url = req.url;
    // console.log(url);
    res.redirect("/");
    res.send("user Logged out");
  } catch (err) {
    next(err);
  }
});

router.get("/users/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    next(err);
  }
});

router.get("/users/updateToken", auth, async (req, res, next) => {
  try {
    const token = await req.user.generateAuthToken();
    req.user.tokens = req.user.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    res.send(token);
  } catch (error) {
    next(err);
  }
});

module.exports = router;
