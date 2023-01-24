const handlePaginatedBooks = (req, res, isAdmin = false) => {
  console.log("ENTER PAGINATED BOOKS HANDLER");
  //console.log(req.paginatedBooks);
  const books = req.paginatedBooks.booksPage;
  const pages = req.paginatedBooks.pages;
  const limit = req.paginatedBooks.limit;
  //console.log(req.user);

  if (req.user) {
    const user = req.user;
    //FIXME:??? add nested if to get user in #each (handlebars)
    //* added for the book link
    let type = isAdmin ? "admin" : "user";
    for (const book of books) {
      book.user = type;
    }

    return res.render("main", { books, pages, limit, user });
  } else return res.render("main", { books, pages, limit });
};

module.exports = handlePaginatedBooks;
