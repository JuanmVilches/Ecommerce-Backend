const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/orders.routes");
const productRoutes = require("./routes/product.routes");
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
// Rutas
app.use([userRoutes, productRoutes, orderRoutes]);

module.exports = app;
