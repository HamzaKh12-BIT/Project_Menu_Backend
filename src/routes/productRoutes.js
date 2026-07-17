const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

// Public
router.get("/", getProducts);
router.get("/category/:categoryId", getProductsByCategory);

// Protected
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;