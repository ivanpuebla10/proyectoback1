const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authentication, isAdmin} = require('../middleware/authentication')


router.post('/createuser',UserController.create);
router.get('/getusers', authentication, UserController.getAll);
router.post('/login',UserController.login);
router.delete('/logout',authentication, UserController.logout);
router.get('/getcurrentuser',authentication, UserController.getUserLogged);
router.get('/confirm/:emailToken',UserController.confirm);





module.exports = router;