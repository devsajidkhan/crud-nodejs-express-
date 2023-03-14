const express = require('express');
const usersController = require('../controller/controller');
const router = express.Router();



router.post('/users', usersController.createUser);
router.get('/Login', usersController.getUser);

module.exports = router;