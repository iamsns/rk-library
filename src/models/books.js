const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 50,
    },
    author: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    description: {
      type: String,
      required: false,
      maxLength: 100,
    },
    edition: {
      type: Number,
      required: false,
      // max : Date.getFullYear()
    },
    categories: [
      {
        type: String,

        required: true,
      },
    ],
    imageGallery: [
      {
        type: String,
        required: false,
      },
    ],
    pages: {
      type: Number,
      required: false,
      min: 1,
    },
    language: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// Create the virtual to populate
bookSchema.virtual("category", {
  ref: "BookCategory",
  localField: "categories",
  foreignField: "id",
});

module.exports = mongoose.model("Book", bookSchema);
