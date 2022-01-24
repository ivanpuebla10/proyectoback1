const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.get('/getorders',OrderController.getAll)
router.post('/createorder',OrderController.create)

module.exports = router;