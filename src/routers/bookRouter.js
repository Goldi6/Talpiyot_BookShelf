const express = require("express");
const Book = require("../models/booksModel");
const authAdmin = require("../middleware/authAdmin");
const paginated = require("../middleware/pagination");

const router = new express.Router();

const { verifyRequestFields } = require("../middleware/verifiers.js");
const handlePaginatedBooks = require("../helpers/handlePaginatedBooks.js");
const paginatedResults = require("../middleware/pagination.js");
const authUser = require("../middleware/authUser.js");

router.get("/books/get/:id", async (req, res, next) => {
  const _id = req.params["id"];

  try {
    const book = await Book.findById(_id);

    if (!book) {
      next(book);
    }

    res.render("bookPage", { book });
  } catch (err) {
    next(err);
  }
});
router.get("/user/books/get/:id", authUser, async (req, res, next) => {
  const _id = req.params["id"];
  const user = req.user;
  console.log(user);

  try {
    const book = await Book.findById(_id);

    if (!book) {
      next(book);
    }
    res.render("bookPage", { book, user });
  } catch (err) {
    next(err);
  }
});
router.post(
  "/admin/books/new",
  authAdmin,
  verifyRequestFields(Book),
  async (req, res, next) => {
    console.log("New book router");
    //const user = req.user._id;
    const book = new Book({ ...req.body });

    try {
      await book.save();
      return res.status(201).send(book);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/admin/books/delete/:id", authAdmin, async (req, res) => {
  const _id = req.param("id");
  console.log(_id);
  console.log(req.user._id);
  try {
    const book = await Book.findOneAndDelete({ _id, user: req.user._id });
    if (!book) {
      return res.status(404).send({ status: 404, message: "book not found" });
    }

    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.patch(
  "/admin/books/update/:id",
  authAdmin,
  verifyRequestFields(Book),
  async (req, res, next) => {
    try {
      const _id = req.params["id"];
      const updateData = req.body;
      const book = await Book.findOneAndUpdate({ _id }, updateData, {
        new: true,
        runValidators: true,
      });
      if (!book) {
        next(book);
      }

      res.send(book);
    } catch (err) {
      next(err);
    }
  }
);

// router.get("/admin/books/all", authAdmin, async (req, res) => {
//   searchFunction(true, req, res);
// });
router.get(
  "/admin/books/search",
  authAdmin,
  paginatedResults(Book, true),
  async (req, res) => {
    handlePaginatedBooks(req, res, true);
  }
);

router.get("/books/search", paginatedResults(Book), async (req, res, next) => {
  handlePaginatedBooks(req, res);
});
router.get(
  "/user/books/search",
  authUser,
  paginatedResults(Book),
  async (req, res) => {
    console.log("HERE");
    //console.log(req.user);
    handlePaginatedBooks(req, res);
  }
);
// router.get("/books/get", async (req, res) => {
//   const _id = req.query.id;

//   try {
//     const book = await Book.findById(_id);

//     if (!book) {
//       return res.status(404).send({ status: 404, message: "book not found" });
//     }

//     res.send(book);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
