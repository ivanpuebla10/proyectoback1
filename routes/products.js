const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const {authentication, isAdmin} = require('../middleware/authentication')


router.post('/createproduct',authentication, isAdmin, ProductController.create)
router.put('/update/:id',authentication, isAdmin, ProductController.update)
router.get('/getproducts',ProductController.getAll)
router.get('/getproductbyid/:id',ProductController.getById);
router.get('/getproductbyname/:model',ProductController.getOneByName)
router.get('/getproductbyprice/:price',ProductController.getOneByPrice)
router.get('/orderproducts',ProductController.orderProductsDesc)
router.delete('/:id',authentication, isAdmin, ProductController.delete)


module.exports = router;