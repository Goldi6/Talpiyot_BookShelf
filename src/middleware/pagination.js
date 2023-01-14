const paginatedResults = (model, isAdmin = false) => {
  return async (req, res, next) => {
    const search = {};
    const options = { sort: { createdAt: 1 } };
    const match = {};
    ////
    if (req.query.sortDate) {
      options.sort.createdAt = req.query.sortDate === "desc" ? 1 : -1; //
    }
    ///////
    if (isAdmin) {
      if (req.query.inStock) {
        const inStock = req.query.inStock;
        // console.log(inStock);
        if (inStock) search.quantity = { $gte: 1 };
        else if (inStock === false) {
          search.quantity = { $lt: 1 };
        }
      }
    } else {
      search.quantity = { $gte: 1 };
    }
    ////
    //search values
    if (req.query.search) {
      const searchFor = req.query.search;
      search.$or = [
        { name: { $regex: new RegExp(searchFor), $options: "i" } },
        { author: { $regex: new RegExp(searchFor), $options: "i" } },
        { category: { $regex: new RegExp(searchFor), $options: "i" } },
        { description: { $regex: new RegExp(searchFor), $options: "i" } },
      ];
    }

    try {
      const books = await model.find(search, match, options);
      //console.log(books);

      if (books.length > 0) {
        let page = 1;
        let limit = 10;
        if (isAdmin) limit = books.length;

        if (req.query.limit) {
          limit = parseInt(req.query.limit);
        }

        if (req.query.page) {
          page = parseInt(req.query.page);
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {};

        result.booksPage = books.slice(startIndex, endIndex);
        result.limit = limit;
        const pages = { current: page };

        if (startIndex > 0) {
          pages.previous = page - 1;

          if ((page - 2) * limit > 0) {
            pages.morePrevious = page - 2;
          }
        }
        if (endIndex < books.length) {
          pages.next = page + 1;
          if ((page + 1) * limit < books.length) {
            pages.moreNext = page + 2;
          }
        }
        result.pages = pages;
        req.paginatedBooks = result;
        next();
      } else {
        if (isAdmin) {
          return res.render("dashboard", {
            username: req.user.username,
            message: "No books to show ",
          });
        }
        return res
          .status(404)
          .send({ status: 404, message: "books not found" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };
};

module.exports = paginatedResults;
