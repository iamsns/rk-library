const express = require('express');

const authController = require('../controllers/auth');
const { verifyAuth } = require('../middlewares/verifyAuth');
const authValidations = require('../validations/authValidations')

const router = express.Router()

router.post('/login', authValidations.loginValidation, authController.login)

// router.get('/logout', verifyAuth, authController.logout)

router.post('/register', authValidations.signupValidation, authController.register) 

module.exports = router