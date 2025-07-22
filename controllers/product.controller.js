const Product = require("../models/product.model");

async function createProduct(req, res) {
  try {

    const product = new Product(req.body);
    if (req.file) {
      product.image = req.file.filename
    } else {
      return res.status(400).send({ message: "No se ha subido una imagen" });
    }
    const productSaved = await product.save();
    return res
      .status(201)
      .send({ message: "Producto creado exitosamente", product: productSaved });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al crear el producto" });
  }
}

async function getProducts(req, res) {

  try {
    const products = await Product.find()
      .sort({ name: 1 })
      .collation({ locale: "es" });
    console.log("Products:", products);

    return res
      .status(200)
      .send({ message: "Productos obtenidos exitosamente", products, });
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
    const productData = req.body;
    const productToEdit = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    if (!productToEdit) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    if (!productData) {
      return res.status(400).send({
        message: "No se proporcionaron datos para actualizar el producto",
      });
    }

    return res.status(200).send({
      message: "Producto editado exitosamente",
      product: productToEdit,
    });
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
