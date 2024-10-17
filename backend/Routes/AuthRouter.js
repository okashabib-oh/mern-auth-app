const { signup, login } = require('../Controllers/AuthController');
const { signUpValidation, logInValidation } = require('../Middlewares/AuthMiddleware');

const router = require('express').Router();

router.post('/login', logInValidation, login)
router.post('/signup', signUpValidation, signup)

module.exports = router;