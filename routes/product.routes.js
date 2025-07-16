const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
// const auth = require("../middlewares/auth.middleware");
// const isAdmin = require("../middlewares/admin.middleware");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.delete("/products/:id", productController.deleteProductById);
router.put("/products/:id", productController.editProductById);
module.exports = router;
