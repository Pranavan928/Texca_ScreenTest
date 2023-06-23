const axios = require("axios");
const DUMMY_DATA_LINK = process.env.DUMMY_DATA_LINK;
const PRODUCT_API_ENDPOINT = DUMMY_DATA_LINK + "/products";

const getProducts = async (category, limit, skip) => {
  let DATA_URL = PRODUCT_API_ENDPOINT;

  const isValid = await isValidCategory(category);

  if (isValid) DATA_URL = DATA_URL + `/category/${category}`;

  DATA_URL = DATA_URL + `?limit=${limit}&skip=${skip}`;

  return axios.get(DATA_URL);
};

const getCategories = () => {
  let DATA_URL = PRODUCT_API_ENDPOINT + "/categories";
  return axios.get(DATA_URL);
};

const isValidCategory = async (category) => {
  if (category === null || category === undefined) return false;

  const categories = await getCategories();
  return categories?.data?.includes(category);
};

module.exports = {
  getProducts,
  getCategories,
};
