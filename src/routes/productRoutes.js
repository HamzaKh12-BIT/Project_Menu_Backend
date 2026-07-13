const express = require("express");

const router = express.Router();

const {
    getProducts,
    getProductsByCategory
} = require("../controllers/productController");

router.get("/", getProducts);

router.get(
    "/category/:categoryId",
    getProductsByCategory
);

module.exports = router;