const express = require("express");
const cookieParser = require("cookie-parser");
const adminAuth = require("../middleware/authAdmin");
const authAdmin = require("../middleware/authAdmin");
const authUser = require("../middleware/authUser");
const { render } = require("sass");

const router = express.Router();

//TODO: check this
router.get("/cart", function (req, res) {
  res.render("cart", { user: req.user });
});
router.get("/user/cart", authUser, function (req, res) {
  res.render("cart", { user: req.user });
});

// router.get("/book/:bookId", async function (req, res) {
//   const book = req.params.bookId;
//   console.log(book);

//   //else res.redirect("/admin/cart.html");
// });

router.get("/admin", authAdmin, async (req, res, next) => {
  //console.log(req.user, "get admin");
  try {
    //const username = req.user.username;
    //console.log(username);
    res.cookie("token", req.token);
    //res.cookie("username", req.user.username);
    res.redirect("/admin/books/search");
    // res.render("dashboard", { username: req.user.username });
  } catch (err) {
    next(err);
  }
});
router.get("/admin/login", async (req, res, next) => {
  //console.log(req.user, "get admin");
  const cookies = req.cookies;
  const token = cookies.token ? cookies.token : false;
  if (token) {
    return res.redirect("/admin");
  }

  res.render("adminLogin");
});

router.get("/", async (req, res, next) => {
  try {
    res.redirect("/user/books/search");
    // res.render("dashboard", { username: req.user.username });
  } catch (err) {
    next(err);
  }
});
router.get("/user", authUser, async (req, res, next) => {
  try {
    res.redirect("/user/books/search");
    // res.render("dashboard", { username: req.user.username });
  } catch (err) {
    next(err);
  }
});
router.get("/login", async (req, res, next) => {
  //console.log(req.user, "get admin");
  // const cookies = req.cookies;
  // const token = cookies.token ? cookies.token : false;
  // if (token) {
  //   return res.redirect("/admin");
  // }

  res.render("userLogin");
});

router.get("/user/profile", authUser, async (req, res, next) => {
  try {
    console.log("USER PROFILE");
    const user = req.user;
    res.cookie("userToken", req.token);

    res.render("userProfile", { user });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/profile", authAdmin, async (req, res, next) => {
  try {
    const user = req.user;
    res.cookie("token", req.token);
    res.render("userProfile", { user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
