const handlePaginatedBooks = (req, res, isAdmin = false) => {
  if (Object.keys(req.paginatedBooks).length === 0) {
    if (req.user) {
      return res.render("main", { user: req.user });
    } else {
      return res.render("main");
    }
  }
  const books = req.paginatedBooks.booksPage;
  const pages = req.paginatedBooks.pages;
  const limit = req.paginatedBooks.limit;
  let search = "";
  if (req.query.search) {
    search = req.query.search;
  }

  if (req.user) {
    const user = req.user;
    //FIXME:??? add nested if to get user in #each (handlebars)
    //* added for the book link
    let type = isAdmin ? "admin" : "user";
    for (const book of books) {
      book.user = type;
    }

    return res.render("main", { books, pages, limit, user, search });
  } else return res.render("main", { books, pages, limit, search });
};

module.exports = handlePaginatedBooks;
