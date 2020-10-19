const { Router } = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = Router();

router.get('/user', authController.user_get)
router.patch('/user/:id', authController.updateUser_patch)
router.patch('/user/book/:id', userController.bookCar_patch)


module.exports = router;