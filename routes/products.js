const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.post('/createproduct',ProductController.create)
router.put('/update/:id',ProductController.update)
router.get('/getproducts',ProductController.getAll)
router.get('/getproductbyid/:id',ProductController.getById);
router.get('/getproductbyname/:model',ProductController.getOneByName)
router.get('/getproductbyprice/:price',ProductController.getOneByPrice)
router.get('/orderproducts',ProductController.orderProductsDesc)
router.delete('/:id',ProductController.delete)


module.exports = router;