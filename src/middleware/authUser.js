const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log(data);

    const user = await User.findOne({
      _id: data._id,
      "tokens.token": token, //way of getting values from array in mongodb
    });

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "not authenticated",
    });
  }
};

module.exports = authUser;
