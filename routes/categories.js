const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')

router.get('/getcategories',CategoryController.getAll);
router.get('/getcategorybyid/:id',CategoryController.getById);
router.get('/getcategorybyname/:name',CategoryController.getOneByName);
router.post('/createcategory',CategoryController.create);
router.put('/updatecategory/:id',CategoryController.update);
router.delete('/deletecategory/:id',CategoryController.delete);



module.exports = router;
