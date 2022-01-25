const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const {authentication, isAdmin} = require('../middleware/authentication')
const { uploadUserProductsImages } = require('../middleware/multer');



router.post('/createproduct',authentication, isAdmin, uploadUserProductsImages.single('imageProduct'),ProductController.create)
router.put('/update/:id',authentication, isAdmin, uploadUserProductsImages.single('imageProduct'), ProductController.update)
router.get('/getproducts',ProductController.getAll)
router.get('/getproductbyid/:id',ProductController.getById);
router.get('/getproductbyname/:model',ProductController.getOneByName)
router.get('/getproductbyprice/:price',ProductController.getOneByPrice)
router.get('/orderproducts',ProductController.orderProductsDesc)
router.delete('/:id',authentication, isAdmin, ProductController.delete)


module.exports = router;