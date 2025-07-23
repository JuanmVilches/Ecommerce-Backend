const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', [auth], userController.editUser);
router.delete('/users/:id', [auth, isAdmin], userController.deleteUser);
router.post('/login', userController.loginUser);
module.exports = router;
