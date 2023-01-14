const express = require("express");
const Book = require("../models/booksModel");
const authAdmin = require("../middleware/authAdmin");
const paginatedBooks = require("../middleware/pagination");

const router = new express.Router();

function verifyBooksFields(data) {
  const wrongFields = [];

  const bodyFields = Object.keys(data);
  const schemaFields = Object.keys(Book.schema.obj);
  //console.log(fields);
  const verified = bodyFields.every((el) => {
    if (!schemaFields.includes(el)) {
      wrongFields.push(el);
      return false;
    }
    return true;
  });
  if (verified) return true;
  else return wrongFields;
}

router.post("/admin/books/new", authAdmin, async (req, res) => {
  console.log("New book router");
  const user = req.user._id;
  if (verifyBooksFields(req.body)) {
    const book = new Book({ ...req.body });

    try {
      await book.save();
      return res.status(201).send(book);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    return res
      .status(400)
      .send({ status: 400, message: "wrong schema fields" });
  }
});

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
router.patch("/admin/books/update/:id", authAdmin, async (req, res) => {
  const verified = verifyBooksFields(req.body);
  if (verified.length > 0) {
    return res
      .status(400)
      .send({ status: 400, message: `wrong fields : ${verified}` });
  }

  try {
    const _id = req.params["id"];
    const updateData = req.body;
    const book = await Book.findOneAndUpdate({ _id }, updateData, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).send({ status: 404, message: "book not found" });
    }

    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.get("/admin/books/all", authAdmin, async (req, res) => {
//   searchFunction(true, req, res);
// });
router.get(
  "/admin/books/search",
  authAdmin,
  paginatedBooks(Book, true),
  async (req, res) => {
    console.log("search");
    //console.log(req.paginatedBooks);
    handlePaginatedBooks(res, req, true);
  }
);

router.get("/books/search", paginatedBooks(Book), async (req, res) => {
  handlePaginatedBooks(res, req);
});

router.get("/books/get", async (req, res) => {
  const _id = req.query.id;

  try {
    const book = await Book.findById(_id);

    if (!book) {
      return res.status(404).send({ status: 404, message: "book not found" });
    }

    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

function handlePaginatedBooks(res, result, isAdmin = false) {
  const books = result.paginatedBooks.booksPage;
  const pages = result.paginatedBooks.pages;
  const limit = result.paginatedBooks.limit;
  console.log(pages);

  if (isAdmin) {
    const username = result.user.username;
    return res.render("dashboard", {
      username,
      books,
      pages,
      limit,
    });
  } else {
    return res.render("main", { books, pages, limit });
  }
  //return res.send({ books, pages, limit });
}

module.exports = router;

// async function searchFunction(isAdmin, req, res) {
//   let page = 1;
//   let limit = 5;
//   const match = {};
//   const options = {};
//   const search = {};
//   if (isAdmin) {
//     if (req.query.inStock) {
//       const inStock = req.query.inStock;
//       // console.log(inStock);
//       if (inStock) search.quantity = { $gte: 1 };
//       else if (inStock === false) {
//         search.quantity = { $lt: 1 };
//       }
//     }
//   } else {
//     search.quantity = { $gte: 1 };
//   }

//   // if (req.query.author) {
//   //   match.author = req.query.author;
//   // }
//   if (req.query.search) {
//     const searchFor = req.query.search;
//     search.$or = [
//       { name: { $regex: new RegExp(searchFor) } },
//       { author: { $regex: new RegExp(searchFor) } },
//       { category: { $regex: new RegExp(searchFor) } },
//       { description: { $regex: new RegExp(searchFor) } },
//     ];
//   }
//   if (req.query.limit) {
//     limit = parseInt(req.query.limit);
//     options.limit = limit;
//   }

//   // if (req.query.skip) {
//   //   options.skip = parseInt(req.query.skip);
//   // }
//   if (req.query.page) {
//     page = parseInt(req.query.page);
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     options.skip = startIndex;
//   }

//   if (req.query.sortDate) {
//     options.sort = {};
//     options.sort.createdAt = req.query.sortDate === "desc" ? 1 : -1; //
//   }

//   try {
//     const books = await Book.find(search, match, options);
//     console.log(books);
//     if (books.length > 0) {
//       if (isAdmin) {
//         return res.render("dashboard", { username: req.user.username, books });
//       }
//       return res.send(books);
//     } else {
//       if (isAdmin) {
//         return res.render("dashboard", {
//           username: req.user.username,
//           message: "No books to show ",
//         });
//       }
//       return res.status(404).send({ status: 404, message: "books not found" });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// }
