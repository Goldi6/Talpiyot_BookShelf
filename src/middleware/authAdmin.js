const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const authAdmin = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const token = cookies.token ? cookies.token : false;
    if (token) {
      const data = jwt.verify(token, process.env.TOKEN_SECRET);

      const user = await Admin.findOne({
        _id: data._id,
        "tokens.token": token, //way of getting values from array in mongodb
      });

      if (!user) {
        //throw new Error("user not found");
        console.log("TOKEN NOT VARIFIED");

        req.user = undefined;
        res.clearCookie("token");
        res.render("adminLogin");

        //next();
      } else {
        // console.log(token);
        req.user = user;
        req.token = token;

        next();
      }
    } else {
      // console.log("no token");

      res.render("adminLogin");
    }
  } catch (err) {
    console.log(err);
    if (err.TokenExpiredError) {
      res.clearCookie("token");
      res.render("adminLogin");
    }

    res.render("404");
    // res.status(400).send({
    //   status: 400,
    //   message: "not authenticated",
    // });
  }
};

module.exports = authAdmin;
