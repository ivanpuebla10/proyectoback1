const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

router.post('/createuser',UserController.create),
router.get('/getuser',UserController.getAll)


module.exports = router;