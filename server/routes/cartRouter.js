const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  removeCart,
  updateCart,
} = require("../controller/cartController");
const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.post("/remove", protect, removeCart);
router.put("/", protect, updateCart);

module.exports = router;
