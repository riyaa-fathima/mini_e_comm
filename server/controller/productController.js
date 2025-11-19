const Product = require("../models/productModels");
exports.createProduct = async (req, res) => {
  try {
    const imageUrl = req.file?.path;

    const newProduct = await Product.create({
      ...req.body,
      image: imageUrl || req.body.image,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file?.path;
    console.log(req.body);
    const updatedFields = { ...req.body };
    if (imageUrl) updatedFields.image = imageUrl;
    const upadatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );
    if (!upadatedProduct)
      return res.status(401).json({ message: "Product not found" });
    res.json(upadatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    if (!products)
      return res.status(404).json({ message: "product not found" });
    res.json({ message: "product deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    if (!products) {
      return res.status(400).json({ message: "product not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
