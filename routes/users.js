const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

router.post('/createuser',UserController.create)

module.exports = router;