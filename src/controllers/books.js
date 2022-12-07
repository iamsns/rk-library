const { validationResult } = require("express-validator");

const httpStatus = require("../utils/status");
const BookCategory = require("../models/bookCategories");
const Book = require("../models/books");
const { validationErrorResponse } = require("../utils/microservices");

exports.getBooks = async (req, res, next) => {
  // console.log('category', req)
  const bookPerPage = 10;
  const page = req.body.page ? req.body.page : 1;
  const category = req.body.category;
  try {
    const books = await Book.find(
      category ? { categories: { $in: category } } : {},
      // {},
      { _id: 0, __v: 0 },
      { sort: { title: 1 }, limit: bookPerPage }
    )
      .skip((page - 1) * bookPerPage)
      .populate({ path: "category", select: "name id -_id" });
    if (books?.length > 0) {
      return res.status(httpStatus.SUCCESS).json({
        status: httpStatus.SUCCESS,
        message: "Success!",
        books: books,
      });
    }
    return res.status(httpStatus.SUCCESS).json({
      status: httpStatus.SUCCESS,
      message: "No Book Found!",
      books: [],
    });
  } catch (err) {
    console.log("errorr", err);
    return res.status(httpStatus.SERVER_SIDE_ERROR).json({
      status: httpStatus.SERVER_SIDE_ERROR,
      name: err.name,
      message: err.message,
    });
  }
};

exports.bookUpdation = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(httpStatus.INVALID_INPUTS).json({
      status: httpStatus.INVALID_INPUTS,
      message: "Validation errors",
      errors: errors.array(),
    });
  }

  if (req.body.bookID) {
    return editBook(req, res);
  } else {
    return addBook(req, res);
  }
};

const addBook = async (req, res) => {
  const {
    title,
    author,
    categories,
    description,
    edition,
    language,
    pages,
    imageGallery,
  } = req.body;
  try {
    const totalBooks = await Book.count();
    let bookID = String(totalBooks + 1).padStart(8, "0");
    bookID = "BOOK" + bookID;
    const newBook = new Book({
      id: bookID,
      title,
      author,
      categories,
      edition,
      language,
      pages,
      description,
      imageGallery,
    });
    const bookResult = await newBook.save();
    if (bookResult) {
      return res.status(httpStatus.SUCCESS_CREATED).json({
        status: httpStatus.SUCCESS_CREATED,
        message: "Book added successfully!",
      });
    } else {
      return res.json({
        status: httpStatus.SERVER_SIDE_ERROR,
        name: err.name,
        message: err.message,
      });
    }
  } catch (err) {
    console.log("errorr", err);
    return res.json({ name: err.name, message: err.message });
  }
};

const editBook = async (req, res) => {
  const { bookID, title, author, categories } = req.body;
  try {
    const updateResult = await Book.findOneAndUpdate(
      { id: bookID },
      { $set: { title, author, categories } }
    );
    if (updateResult) {
      return res.status(httpStatus.SUCCESS_CREATED).json({
        status: httpStatus.SUCCESS_CREATED,
        message: "Book updated successfully!",
      });
    } else {
      return res.status(httpStatus.INVALID_INPUTS).json({
        status: httpStatus.INVALID_INPUTS,
        message: "Book not found!",
      });
    }
  } catch (err) {
    console.log("errorr", err);
    return res.status(httpStatus.SERVER_SIDE_ERROR).json({
      status: httpStatus.SERVER_SIDE_ERROR,
      name: err.name,
      message: err.message,
    });
  }
};

exports.getCategories = async (req, res, next) => {
  // return Book.find().select('-_id -__v').limit(3)
  try {
    const categories = await BookCategory.find(
      {},
      { _id: 0, __v: 0 },
      { sort: { name: 1 } }
    );
    return res.status(httpStatus.SUCCESS).json({
      status: httpStatus.SUCCESS,
      message: categories?.length ? "Success!" : "No Book Found!",
      categories: categories?.length > 0 ? categories : [],
    });
  } catch (err) {
    console.log("errorr", err);
    return res.status(httpStatus.SERVER_SIDE_ERROR).json({
      status: httpStatus.SERVER_SIDE_ERROR,
      name: err.name,
      message: err.message,
    });
  }
};

exports.categoryUpdation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return validationErrorResponse(res, errors);
    }
    if (req.body.catId) {
      return editCategory(req, res, next);
    } else {
      return addCategory(req, res, next);
    }
  } catch (err) {
    console.log("errorr", err);
    return res.status(httpStatus.SERVER_SIDE_ERROR).json({
      status: httpStatus.SERVER_SIDE_ERROR,
      name: err.name,
      message: err.message,
    });
  }
};

const addCategory = async (req, res, next) => {
  try {
    const totalCategories = await BookCategory.count();
    let categoryID = String(totalCategories + 1).padStart(3, "0");
    categoryID = "CAT" + categoryID;
    const newCategory = new BookCategory({
      id: categoryID,
      name: req.body.name,
    });
    const catRes = await newCategory.save();
    if (catRes) {
      console.log("catRes", catRes);
      return res
        .status(httpStatus.SUCCESS_CREATED)
        .json({ status: httpStatus.SUCCESS_CREATED, message: "Success" });
    }
    return res.status(httpStatus.SERVER_SIDE_ERROR).json({
      status: httpStatus.SERVER_SIDE_ERROR,
      message: "Error in category add",
    });
  } catch (err) {
    console.log("errorr", err);
    return res.json({ name: err.name, message: err.message });
  }
};

const editCategory = async (req, res, next) => {
  try {
    const updateResult = await BookCategory.findOneAndUpdate(
      { id: req.body.catId },
      { $set: { name: req.body.name } }
    );
    if (updateResult) {
      console.log("updateResult", updateResult);
      return res
        .status(httpStatus.SUCCESS_CREATED)
        .json({ status: httpStatus.SUCCESS_CREATED, message: "Success" });
    }
    return res.status(httpStatus.INVALID_INPUTS).json({
      status: httpStatus.INVALID_INPUTS,
      message: "Category not found!",
    });
  } catch (err) {
    console.log("errorr", err);
    return res.json({ name: err.name, message: err.message });
  }
};
