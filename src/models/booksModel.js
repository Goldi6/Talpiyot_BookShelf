const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "not Categorized",
    },
    quantity: {
      type: String,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// bookSchema.methods.toJSON = function () {
//   const book = this;
//   const bookObj = book.toObject();
//   delete bookObj.quantity;

//   return bookObj;
// };

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
