const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.get('/orders', ordersController.getOrders);
router.post('/orders', ordersController.createOrder);

module.exports = router;
