//const { response, request } = require("express");
const express = require("express");
const Admin = require("../models/adminModel");

const router = express.Router();
const auth = require("../middleware/authAdmin");

////
const verifyFields = (body) => {
  const wrongFields = [];
  const keys = Object.keys(body);
  let schema = Object.keys(Admin.schema.obj);
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

router.post("/admin/new", async (request, response) => {
  const user = new Admin(request.body);

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

router.get("/admin/get", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    err.status(500).send(err);
  }
});
//TODO: update cart
router.patch("/admin/update", auth, async (req, res) => {
  try {
    const field_verify = verifyFields(req.body);
    if (field_verify === true) {
      for (let update in req.body) {
        req.user[update] = req.body[update];
      }
      await req.user.save();

      res.send(req.user);
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

router.delete("/admin/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send("user Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/admin/login", async (req, res) => {
  console.log("LOG");

  const { email, password } = req.body;

  try {
    const user = await Admin.findUserByEmailAndPassword(email, password);
    const token = await user.generateAuthToken();
    console.log(user);

    //res.send({ user, token });
    res.cookie("token", token);
    res.render("dashboard", { username: user.username });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
});

router.post("/admin/logout", auth, async (req, res) => {
  console.log(req.user);

  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    await req.user.save();
    res.clearCookie("token").render("adminLogin");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/admin/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/admin/updateToken", auth, async (req, res) => {
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
