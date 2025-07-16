const Product = require("../models/product.model");

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    const productSaved = await product.save();
    return res
      .status(201)
      .send({ message: "Producto creado exitosamente", product: productSaved });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find()
      .sort({ name: 1 })
      .collation({ locale: "es" });
    return res
      .status(200)
      .send({ message: "Productos obtenidos exitosamente", products });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error al obtener los productos", error });
  }
}

async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    return res
      .status(200)
      .send({ message: "Producto obtenido exitosamente", product });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error al obtener el producto.", error });
  }
}
async function deleteProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "Producto borrado exitosamente", product });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error al borrar el producto", error });
  }
}
async function editProductById(req, res) {
  try {
    const id = req.params.id;
    const productToEdit = await Product.findByIdAndUpdate(id);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error al editar el producto", error });
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  deleteProductById,
  editProductById,
};
