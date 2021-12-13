const express = require('express');
const router = express.Router();
const controller = require('../controllers/management.controller');
const adminToken = require('../middleware/jwtVerify.middleware');

router.post('/login',controller.login);
router.post('/create',adminToken,controller.create);

router.post('/createproject',adminToken,controller.createProject);
router.post('/updateproject',adminToken,controller.updateProject);
router.get('/getprojects',adminToken,controller.getProjects);
module.exports = router;