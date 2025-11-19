const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  fetchProductById
} = require("../controller/productController");
const router = express.Router();

router.post("/",
   protect,
    admin,
     upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", fetchProductById);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id",protect,admin,deleteProduct)

module.exports = router;
