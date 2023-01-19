const express = require("express");
const cookieParser = require("cookie-parser");
const adminAuth = require("../middleware/authAdmin");
const authAdmin = require("../middleware/authAdmin");
const authUser = require("../middleware/authUser");

const router = express.Router();

//TODO: check this
router.get("/cart", function (req, res) {
  let loggedIn = false;

  if (loggedIn) res.redirect("/cart/cart.html");
  else res.redirect("/admin/cart.html");
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

router.get("/admin/profile", authAdmin, async (req, res, next) => {
  try {
    const username = req.user.username;
    //console.log(username);
    res.cookie("token", req.token);
    //     res.cookie("username", req.user.username);
    res.render("profile", { username, user: req.user });
    // res.render("dashboard", { username: req.user.username });
  } catch (err) {
    next(err);
  }
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

module.exports = router;
