const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Create new buyer
router.route("/").get(productController.getProducts);

router.route("/categories").get(productController.getCategories);

module.exports = router;
