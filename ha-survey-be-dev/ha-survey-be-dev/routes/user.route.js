const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user.controller')
const AuthController = require('../controllers/auth.controller')


router.post('/register', UserController.registerUser);
router.post('/login', AuthController.login);

router.post('/admin/login', AuthController.adminLogin);
router.put('/admin/login', AuthController.adminLogin);

router.post('/refreshtoken', UserController.refreshToken);

module.exports = router;
