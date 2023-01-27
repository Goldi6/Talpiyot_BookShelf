const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const authUser = async (req, res, next) => {
  try {
    //const token = req.header("Authorization").replace("Bearer ", "");
    const cookies = req.cookies;
    const token = cookies.userToken ? cookies.userToken : false;
    if (!token) {
      return next({ name: "NoToken" });
    }
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({
      _id: data._id,
      "tokens.token": token, //way of getting values from array in mongodb
    });

    if (!user) {
      res.clearCookie("userToken");
      return next(user);
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  } catch (err) {
    res.clearCookie("userToken");

    next(err);
  }
};

module.exports = authUser;
