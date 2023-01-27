const express = require("express");
const User = require("../models/usersModel");
const Book = require("../models/booksModel");

const router = express.Router();
const authUser = require("../middleware/authUser");
const { verifyId } = require("../middleware/verifiers.js");

//TODO: cart handlebar
router.get("/users/cart", authUser, async (req, res, next) => {
  try {
    const user = req.user;
    if (user.cart.length > 0) {
      await user.populate("cart.book");
      user.cart = user.cart.filter((cartElement) => {
        if (cartElement.book === null) return false;
        return true;
      });
      return res.send(user.cart);
    } else {
      res.send({ cart: [] });
    }
  } catch (err) {
    next(err);
  }
});

//get items population to the local cart
router.post("/cart/getItems", async (req, res, next) => {
  try {
    const cart = req.body;
    for (el of cart) {
      let book = await Book.findById(el.id);
      if (!book) {
        //?
        book = {};
        book.name = "item not found";
        book.price = 0;
        book._id = el.id;
      }

      el.book = book;
    }
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users/cart/:id",
  authUser,
  verifyId(Book),
  async (req, res, next) => {
    try {
      const bookId = req.params["id"];
      const cart = req.user.cart;
      let updated = false;
      if (cart.length > 0) {
        for (const book of cart) {
          if (book.book == bookId) {
            //let qu = req.body.quantity ? req.body.quantity : 1;
            //NOTE: might get qu{quantity} from user request instead of just adding one
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

      await req.user.save();
      res.status(201).send(req.user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/users/cart/:id", authUser, async (req, res, next) => {
  // "status 204" does not return response and does not need to redirect. successful resource created!
  try {
    const bookId = req.params["id"];
    const books = req.user.cart;

    req.user.cart = books.filter((el) => {
      return el.book != bookId;
    });

    await req.user.save();
    res.send(req.user.cart);
  } catch (err) {
    next(err);
  }
});

router.patch("/users/cart/buy", authUser, async (req, res, next) => {
  try {
    const cart = [...req.user.cart];
    if (cart.length === 0) {
      return next({
        name: "nothingToUpdate",
        message: "nothing to buy, cart is empty",
        status: 204,
      });
    }

    req.user.cart = [];
    req.user.ordered.push(...cart);

    await req.user.save();
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/users/cart/:id",
  authUser,
  verifyId(Book),
  async (req, res, next) => {
    // "status 204" does not return response and does not need to redirect. successful resource created!
    try {
      const id = req.params["id"];
      let updated = false;

      if (!req.query.quantity) {
        return next({
          name: "missingData",
          message: "missing quantity data",
          status: 400,
        });
      }

      for (const book of req.user.cart) {
        if (book.book == id) {
          let quantityToUpdate = req.query.quantity;

          book.quantity = quantityToUpdate;
          updated = true;
          break;
        }
      }

      if (!updated) {
        return next({
          name: "wrongData",
          message: "this item does not exists in your cart",
          status: 400,
        });
      }

      await req.user.save();
      res.send(req.user.cart);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
