const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [
        {
            id: String,
            title: String,
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            }
        }
    ],
    total: {
        type: Number,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "completed", "cancelled"],
    }
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;