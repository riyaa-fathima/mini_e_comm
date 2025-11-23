const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { createOrder, getAllOrders } = require("../controller/orderController");
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/",protect,admin,getAllOrders)

module.exports = router;
