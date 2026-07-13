const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const {
  getTemplate,
  updateTemplate
} = require("../controllers/parameterController");

// Public
router.get("/", getTemplate);

// Admin
router.put(
  "/",
  protect,
  isAdmin,
  updateTemplate
);

module.exports = router;