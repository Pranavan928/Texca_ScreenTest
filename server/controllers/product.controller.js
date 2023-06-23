const productService = require("../services/product.service");

const getProducts = async (req, res) => {
  const limit =
    typeof req.query.limit !== "undefined" ? parseInt(req.query.limit) : 3;
  const skip =
    typeof req.query.skip !== "undefined" ? parseInt(req.query.skip) : 0;
  const category = req.query.category ? req.query.category : undefined;

  let products = await productService.getProducts(category, limit, skip);

  return res.status(200).json({
    message: "products fetched successfully",
    data: products?.data,
  });
};

const getCategories = async (req, res) => {
  let categories = await productService.getCategories();
  return res.status(200).json({
    message: "categories fetched successfully",
    data: categories?.data,
  });
};

module.exports = {
  getProducts,
  getCategories,
};
