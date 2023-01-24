const express = require("express");
const User = require("../models/usersModel");
const Book = require("../models/booksModel");

const router = express.Router();
const authUser = require("../middleware/authUser");
const {
  verifyRequestFieldsInArray,
  verifyId,
} = require("../middleware/verifiers.js");

//TODO: cart handlebar
router.get("/users/cart/get", authUser, async (req, res, next) => {
  const user = req.user;

  if (user.cart.length > 0) {
    try {
      await user.populate("cart.book");
      return res.send(user.cart);
    } catch (err) {
      next(err);
    }
  } else {
    res.send({ cart: [] });
    //next({ name: "emptyCart", message: "cart is empty", status: 404 });
  }
});

router.post(
  "/users/cart/add/:id",
  authUser,
  verifyId(Book),
  async (req, res, next) => {
    // "status 204" does not return response and does not need to redirect. successful resource created!
    try {
      const bookId = req.params["id"];
      const cart = req.user.cart;
      //console.log(cart);
      let updated = false;
      if (cart.length > 0) {
        for (const book of cart) {
          if (book.book == bookId) {
            //let qu = req.body.quantity ? req.body.quantity : 1;
            let qu = 1;
            const currQu = book.quantity;
            book.quantity = currQu + qu;
            updated = true;
          }
        }
      }

      if (!updated) {
        cart.push({ book: bookId, quantity: 1 });
      }
      try {
        await req.user.save();
        res.status(201).send(req.user);
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/users/cart/delete/:id",
  authUser,
  verifyId(Book),
  async (req, res, next) => {
    // "status 204" does not return response and does not need to redirect. successful resource created!

    const bookId = req.params["id"];
    //console.log(bookId);

    const books = req.user.cart;
    //let updated = false;

    req.user.cart = books.filter((el) => {
      return el.book != bookId;
    });
    try {
      await req.user.save();
      res.send(req.user.cart);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/users/cart/update/:id",
  authUser,
  verifyId(Book),
  async (req, res, next) => {
    // "status 204" does not return response and does not need to redirect. successful resource created!
    const id = req.params["id"];
    let updated = false;
    if (req.query.quantity) {
      for (const book of req.user.cart) {
        if (book.book == id) {
          let qu = req.query.quantity;

          book.quantity = qu;
          updated = true;
          break;
        }
      }

      if (!updated) {
        next({
          name: "wrongData",
          message: "this item does not exists in your cart",
          status: 400,
        });
      }
    } else {
      next({
        name: "missingData",
        message: "missing quantity data",
        status: 400,
      });
    }

    try {
      await req.user.save();
      res.send(req.user.cart);
    } catch (err) {
      next(err);
    }
  }
);

router.patch("/users/cart/buy", authUser, async (req, res, next) => {
  // "status 204" does not return response and does not need to redirect. successful resource created!
  console.log("CART ROUTE");
  const cart = [...req.user.cart];
  console.log(cart);
  if (cart.length > 0) {
    req.user.cart = [];
    req.user.ordered.push(...cart);
  } else {
    next({
      name: "nothingToUpdate",
      message: "nothing to buy, cart is empty",
      status: 204,
    });
  }
  try {
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

//get items to local cart
router.post("/cart/getItems", async (req, res, next) => {
  const cart = req.body;
  try {
    for (el of cart) {
      const book = await Book.findById(el.id);
      if (!book) {
        el.book.name = "item not found";
        el.book.price = 0;
      }
      console.log(book);
      el.book = book;
    }
    // console.log(cart);
    res.send(cart);
  } catch (err) {
    next(err);
    // return res
    //   .status(404)
    //   .send({ status: 404, message: "unable to find items" });
  }
  // console.log(bookIds);
  // const books = Book.find({ _id: { $in: bookIds } });
});

module.exports = router;
