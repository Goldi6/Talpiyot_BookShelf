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
        res.clearCookie("token");

        return next(user);
      }

      req.user = user;
      req.token = token;

      next();
    } else {
      next({ name: "NoToken" });
    }
  } catch (err) {
    res.clearCookie("token");

    next(err);
  }
};

module.exports = authAdmin;
