const express = require('express');

const booksController = require('../controllers/books')
const verifyAuth = require('../middlewares/verifyAuth')
const bookValidations = require("../validations/bookValidations")

const router = express.Router()

router.post('/get-books', booksController.getBooks)

router.get("/get-categories", verifyAuth.verifyAuth, booksController.getCategories)

router.post('/edit-category', verifyAuth.verifyAuth, bookValidations.categoryValidation, booksController.categoryUpdation)

router.post('/edit-book', verifyAuth.verifyAuth, bookValidations.bookValidation, booksController.bookUpdation)


module.exports = router