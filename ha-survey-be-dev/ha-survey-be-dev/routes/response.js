const express = require("express");
const router = express.Router();
const UserController = require('../controllers/surveyResponse.controller')


router.post('/surveysubmit',UserController.surveySubmit);

module.exports = router;