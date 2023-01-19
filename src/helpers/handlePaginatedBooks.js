const handlePaginatedBooks = (req, res, isAdmin = false) => {
  const books = req.paginatedBooks.booksPage;
  const pages = req.paginatedBooks.pages;
  const limit = req.paginatedBooks.limit;
  console.log(req.user);

  if (isAdmin) {
    const username = req.user.username;
    //FIXME:??? add nested if to get user in #each (handlebars)
    for (const book of books) {
      book.user = "admin";
    }
    return res.render("dashboard", {
      username,
      books,
      pages,
      limit,
    });
  } else {
    if (req.user) {
      const user = req.user;
      //FIXME:??? add nested if to get user in #each (handlebars)
      for (const book of books) {
        book.user = "user";
      }

      return res.render("main", { books, pages, limit, user });
    } else return res.render("main", { books, pages, limit });
  }
};

module.exports = handlePaginatedBooks;
