const express = require("express");
const User = require("../models/usersModel");
const Book = require("../models/booksModel");

const router = express.Router();
const authUser = require("../middleware/authUser");

function verifyCart(body) {
  const cartKeys = Object.keys(User.schema.obj.cart[0]);
  const dataKeys = Object.keys(body);
  let wrongFields = [];
  for (key of dataKeys) {
    if (!cartKeys.includes(key)) {
      wrongFields.push(key);
    }
  }
  return wrongFields;
}

router.get("/users/cart/get", authUser, async (req, res) => {
  // if (req.query.selected) {
  //   match.selected = req.query.selected === "true";
  //   console.log(match.completed);
  // }

  const user = req.user;
  try {
    if (user.cart.length > 0) {
      await user.populate("cart.book");
      return res.send(user.cart);
    } else {
      return res.send("cart is empty");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/users/cart/add/:id", authUser, async (req, res) => {
  // "status 204" does not return response and does not need to redirect. successful resource created!
  try {
    const bookId = req.params["id"];
    const cart = req.user.cart;
    console.log(cart);
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
      cart.push({ book: bookId });
    }
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/users/cart/delete/:id", authUser, async (req, res) => {
  // "status 204" does not return response and does not need to redirect. successful resource created!

  try {
    const bookId = req.params["id"];
    //console.log(bookId);

    const books = req.user.cart;
    let updated = false;

    req.user.cart = books.filter((el) => {
      return el.book != bookId;
    });

    await req.user.save();
    res.send(req.user.cart);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.patch("/users/cart/update/:id", authUser, async (req, res) => {
  // "status 204" does not return response and does not need to redirect. successful resource created!
  const id = req.params["id"];
  console.log(id);
  console.log("HERE");
  if (req.query.quantity) {
    for (const book of req.user.cart) {
      if (book.book == id) {
        let qu = req.query.quantity;

        book.quantity = qu;
        break;
      }
    }
  } else {
    return res
      .status(400)
      .send({ status: 400, message: "missing data : quantity or id " });
  }

  try {
    await req.user.save();
    res.send(req.user.cart);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/users/cart/buy", authUser, async (req, res) => {
  // "status 204" does not return response and does not need to redirect. successful resource created!

  const cart = [...req.user.cart];
  console.log(cart);
  try {
    req.user.cart = [];
    req.user.ordered.push(...cart);
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/cart/getItems", async (req, res) => {
  const cart = req.body;
  try {
    for (el of cart) {
      const book = await Book.findById(el.id);
      console.log(book);
      el.book = book;
    }
    // console.log(cart);
    res.send(cart);
  } catch (err) {
    return res
      .status(404)
      .send({ status: 404, message: "unable to find items" });
  }
  // console.log(bookIds);
  // const books = Book.find({ _id: { $in: bookIds } });
});

module.exports = router;
