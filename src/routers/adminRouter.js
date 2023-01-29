const express = require("express");
const Admin = require("../models/adminModel");

const router = express.Router();
const auth = require("../middleware/authAdmin");
const { verifyRequestFields } = require("../middleware/verifiers.js");
const FILTER = ["tokens", "cart"];
////

router.post("/admin/login", async (req, res, next) => {
  // console.log("LOG");

  const { email, password } = req.body;

  try {
    const user = await Admin.findUserByEmailAndPassword(email, password);

    if (!user) return next(user);

    const token = await user.generateAuthToken();

    res.cookie("token", token);
    res.render("main", { username: user.username });
  } catch (err) {
    next(err);
  }
});
//NOTE: UNUSED in client
//?NEW ADMIN
router.post(
  "/admin",
  verifyRequestFields(Admin, FILTER),
  async (request, response, next) => {
    const user = new Admin(request.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      //console.log("LOG Admin");
      response.status(201).send({ user, token });
    } catch (err) {
      next(err);
    }
  }
);
//NOTE : unused in client
router.delete("/admin", auth, async (req, res, next) => {
  try {
    await req.user.remove();
    res.send("user Deleted");
  } catch (err) {
    next(err);
  }
});
//update admin
router.patch(
  "/admin",
  auth,
  verifyRequestFields(Admin, FILTER),
  async (req, res, next) => {
    try {
      const _id = req.user._id;

      const user = await Admin.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });

      console.log(user);
      if (user) {
        return res.send(user);
      }
      next(user);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/admin/logout", auth, async (req, res, next) => {
  console.log("LOGOUT");
  console.log(req.user);

  req.user.tokens = req.user.tokens.filter(
    (tokenDoc) => tokenDoc.token !== req.token
  );
  try {
    await req.user.save();
    res.clearCookie("token").redirect("/admin");
  } catch (err) {
    next(err);
  }
});

router.get("/admin/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("user is logged out from everywhere");
  } catch (err) {
    next(err);
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
    next(err);
  }
});

module.exports = router;
