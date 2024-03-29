const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("./booksModel");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      default: "user",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        console.log("validator");
        const regExp = /^[a-zA-Z]+$/;
        if (!regExp.test(value)) throw new Error("should contain only letters");
      },
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
      validate(value) {
        console.log("validator");
        const regExp = /^[a-zA-Z]+/;
        if (!regExp.test(value)) throw new Error("should contain only letters");
      },
    },
    birthday: {
      type: Date,
      required: true,
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
            "must contain at least 8 characters and include lower and uppercase letters and numbers"
          );
        }
      },
    },
    cart: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          // required: true,
          ref: "Book",
          // unique: true,
        },
        quantity: {
          type: Number,
          //required: true,
          //default: 1,
        },
      },
    ],
    ordered: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          //required: true,
          ref: "Book",
        },
        quantity: {
          type: Number,
          //required: true,
          //default: 1,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

//middlewares

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//middlewares_end
userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }

  const isPassMatch = await bcrypt.compare(password, user.password);

  if (!isPassMatch) {
    throw new Error("unable to login");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
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

userSchema.methods.toJSON = function () {
  //goes before signifying to obj, so returns the new obj to the client
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.__v;
  delete userObj.tokens;

  return userObj;
};

////////////
//getters
// ////////////
// userSchema.virtual("age").get(function () {
//   let age = new Date() - new Date(this.birthday).getTime();
//   age = new Date(age);
//   age = age.getUTCFullYear();
//   age = Math.abs(age - 1970);
//   return age;
// });

userSchema.virtual("cartItemsCount").get(function () {
  const cart = this.cart;
  let quantity = 0;
  if (cart.length > 0) {
    for (const item of cart) {
      quantity += parseInt(item.quantity);
    }
  }
  return quantity;
});
userSchema.virtual("cartTotalPrice").get(async function () {
  let totalPrice = 0;
  for (const item of this.cart) {
    const product = await Book.findById(item.book);
    totalPrice += product.price * item.quantity;
  }
  return totalPrice;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
