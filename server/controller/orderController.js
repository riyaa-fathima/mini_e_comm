const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModels");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, shippingInfo, directBuy } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided  " });
    }
    const products = await Product.find({ _id: items.map((i) => i.productId) });
    const orderItems = items.map((i) => ({
      product: i.productId,
      quantity: i.quantity,
    }));
    const totalAmount = items.reduce((sum, i) => {
      const product = products.find(
        (p) => p._id.toString() === items.productId
      );
      return sum + (product?.price || 0) * i.quantity;
    }, 0);
    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingInfo,
      totalAmount,
    });
    if (!directBuy) {
      const cart = await Cart.findOne({ user: userId });
      if (cart) cart.items = [];
      await cart.save();
    }
    res.status(201).json({ message: "Order Placed", order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};
