const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", [upload, auth, isAdmin], productController.createProduct);
router.delete("/products/:id", [auth, isAdmin], productController.deleteProductById);
router.put("/products/:id", [upload], auth, isAdmin, productController.editProductById);
module.exports = router;
