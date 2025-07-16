const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use([userRoutes, productRoutes]);

module.exports = app;
