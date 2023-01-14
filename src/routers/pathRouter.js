const express = require("express");
const cookieParser = require("cookie-parser");
const adminAuth = require("../middleware/authAdmin");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();
//const auth = require("../middleware/authAdmin");
//const path = require("path");

//router.get("/admin", async(req));

// router.get("/admin", function (req, res) {
//   let loggedIn = false;

//   if (loggedIn) res.redirect("/admin/dashboard");
//   else res.cookie("test", "test").redirect("/admin/login");
// });

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

router.get("/admin", authAdmin, async (req, res) => {
  console.log("hhh");
  console.log(req.user, "get admin");
  try {
    if (req.user === undefined) {
      res.render("adminLogin");
    } else {
      const username = req.user.username;
      console.log(username);
      res.cookie("token", req.token);
      res.cookie("username", req.user.username);
      res.redirect("/admin/books/search");
      // res.render("dashboard", { username: req.user.username });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/admin/profile", authAdmin, async (req, res) => {
  try {
    if (req.user === undefined) {
      res.render("adminLogin");
    } else {
      const username = req.user.username;
      console.log(username);
      res.cookie("token", req.token);
      res.cookie("username", req.user.username);
      res.render("profile", { username, user: req.user });
      // res.render("dashboard", { username: req.user.username });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    res.redirect("/books/search");
    // res.render("dashboard", { username: req.user.username });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
