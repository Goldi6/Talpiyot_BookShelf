//const { response, request } = require("express");
const express = require("express");
const User = require("../models/usersModel");
const cookieParser = require("cookie-parser");

const router = express.Router();
const auth = require("../middleware/authUser");

////
const verifyFields = (body) => {
  const wrongFields = [];
  const keys = Object.keys(body);
  let schema = Object.keys(User.schema.obj);
  schema = schema.filter((el) => {
    return el !== "tokens" && el !== "cart";
  });
  const verified = keys.every((el) => {
    if (!schema.includes(el)) {
      wrongFields.push(el);
      return false;
    }
    return true;
  });
  if (verified) return true;
  else return wrongFields;
};

////

router.post("/users/new", async (request, response) => {
  const user = new User(request.body);
  console.log(user);
  try {
    await user.save();
    console.log("LOG");
    const token = await user.generateAuthToken();
    response.status(201).send({ user, token });
  } catch (err) {
    console.log(err);

    response.status(400).send({
      status: 400,
      message: err,
    });
  }
});

router.get("/users/get", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    err.status(500).send(err);
  }
});
//TODO: update cart
router.patch("/users/update", auth, async (req, res) => {
  try {
    const field_verify = verifyFields(req.body);
    if (field_verify === true) {
      //  console.log("HERE");
      for (let update in req.body) {
        req.user[update] = req.body[update];
      }
      await req.user.save();

      return res.send(req.user);
    } else {
      return res.status(400).send({
        status: 400,
        message: "cannot update fields out of schema" + field_verify,
      });
    }
  } catch (err) {
    res.status(404).send({ status: 404, message: err.message });
  }
});

router.delete("/users/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send("user Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/users/login", async (req, res) => {
  console.log("LOG");

  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmailAndPassword(email, password);
    console.log(user);
    const token = await user.generateAuthToken();
    console.log(token);
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
});

router.get("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    await req.user.save();
    res.send({ status: 200, message: "user Logged out" });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users/updateToken", auth, async (req, res) => {
  try {
    const token = await req.user.generateAuthToken();
    req.user.tokens = req.user.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    res.send(token);
  } catch (error) {
    res.status(500).send(err);
  }
});

module.exports = router;
