const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        const regExp = /[a-zA-Z]+/;
        if (!regExp.test(value))
          throw new Error("Name should contain only letters");
      },
    },
    Position: {
      type: String,
      default: "Admin",
    },

    birthday: {
      type: Date,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        //const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.()])[A-Za-z\d!@#$%^&.*()]{8,}$/;
        if (!regex.test(value)) {
          throw new Error(
            "password must contain at least 8 characters and include lower and uppercase letters and numbers"
          );
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//middlewares

adminSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//middlewares_end
adminSchema.statics.findUserByEmailAndPassword = async (email, password) => {
  const user = await Admin.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }

  const isPassMatch = await bcrypt.compare(password, user.password);

  if (!isPassMatch) {
    throw new Error("unable to login");
  }

  return user;
};

adminSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

adminSchema.methods.toJSON = function () {
  //goes before signifying to obj, so returns the new obj to the client
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  // delete userObj.tokens;

  return userObj;
};

////////////
//getters
////////////
adminSchema.virtual("age").get(() => {
  let age = new Date() - new Date(this.birthday).getTime();
  age = new Date(age);
  age = age.getUTCFullYear();
  age = Math.abs(age - 1970);
  return age;
});
adminSchema.virtual("fullName").get(() => {
  return this.firstName + " " + this.lastName;
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
