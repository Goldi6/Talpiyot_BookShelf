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
      const count = await model.countDocuments(search);

      if (count > 0) {
        let page = 1;
        let limit = 10;
        //if (isAdmin) limit = counter;

        if (req.query.limit) {
          limit = parseInt(req.query.limit);
        }

        if (req.query.page) {
          page = parseInt(req.query.page);
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {};

        const books = await model
          .find(search, match, options)
          .limit(limit)
          .skip(startIndex);

        result.booksPage = books;

        result.limit = limit;
        const pages = { current: page };

        if (startIndex > 0) {
          pages.previous = page - 1;

          if ((page - 2) * limit > 0) {
            pages.morePrevious = page - 2;
          }
        }
        if (endIndex < count) {
          pages.next = page + 1;
          if ((page + 1) * limit < count) {
            pages.moreNext = page + 2;
          }
        }
        result.pages = pages;
        req.paginatedBooks = result;
        return next();
      } else {
        if (isAdmin) {
          return next({
            status: 404,
            message: "No books found",
            name: "EmptyBooksData",
            isAdmin: true,
          });
        }
        return next({
          status: 404,
          message: "No books found according to your request",
          name: "EmptyBooksData",
          isAdmin: false,
        });
      }
    } catch (err) {
      next(err);
    }
  };
};

module.exports = paginatedResults;
