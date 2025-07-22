const Order = require("../models/order.model");

async function createOrder(req, res) {
    try {

        const order = new Order(req.body);

        const orderSaved = await order.save();
        return res
            .status(201)
            .send({ message: "Orden creada exitosamente", order: orderSaved });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al enviar la orden" });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await Order.find()
        return res
            .status(200)
            .send({ message: "Ordenes obtenidas exitosamente", orders, });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Error al obtener las ordenes", error });
    }
}

module.exports = { createOrder, getOrders };