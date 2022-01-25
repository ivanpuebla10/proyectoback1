const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authentication, isAdmin} = require('../middleware/authentication')


router.post('/createuser',UserController.create);
router.get('/getusers', authentication, isAdmin, UserController.getAll);
router.post('/login',UserController.login);
router.delete('/logout',authentication, UserController.logout);
router.get('/getcurrentuser/:id',authentication, UserController.getUserLogged);





module.exports = router;