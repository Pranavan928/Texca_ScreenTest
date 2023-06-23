import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import BASE_URL from "../const";

function ProductList() {
  //get params
  const { _category } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  //get query params
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(queryParams.get("page"));
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  //set limit for pagination
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}/products?limit=${limit}&skip=${
          (page - 1) * limit
        }&category=${_category ? _category : ""}`;
        const response = await axios.get(url);
        setProducts(response?.data?.data?.products);
        setCount(response?.data?.data?.total);
        setIsLoading1(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const url = `${BASE_URL}/products/categories`;
        const response = await axios.get(url);
        let temp = response?.data?.data;
        temp.unshift("all products");
        setCategories(temp);
        setIsLoading2(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchCategories();
  }, [_category, page]);

  useEffect(() => {
    const handleUrlChange = () => {
      const currentPageUrl = window.location.href;
      const urlParams = new URLSearchParams(currentPageUrl.split("?")[1]);
      const newPage = urlParams.get("page");
      console.log(newPage);
      setPage(newPage);
    };

    window.addEventListener("popstate", handleUrlChange);

    handleUrlChange();

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  //handle pagination
  const handleChange = async (event, value) => {
    setPage(value);
    try {
      navigate(
        `/${_category ? _category : ""}?page=${value}&limit=${limit}&skip=${
          (value - 1) * limit
        }`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isLoading1 && !isLoading2 ? (
        <Grid container>
          <Grid xs={9}>
            <h1 style={{ marginLeft: 10 }}>
              {_category && _category !== "all products"
                ? _category
                : "Products"}
            </h1>
          </Grid>
          <Grid xs={3}>
            <Box mb={2}>
              <FormControl
                variant="outlined"
                style={{ width: "90%", minWidth: 200, marginTop: 20 }}
              >
                <InputLabel id="category-filter-label">Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  id="category-filter"
                  value={category} // Set the selected category value here
                  label="Category"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      onClick={(e) => {
                        setPage(1);
                        navigate(`/${category}?page=${1}&limit=${limit}`);
                      }}
                      value={category}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid container spacing={2}>
            {products.map((data) => (
              <Grid xs={12} sm={6} md={4} lg={3}>
                {!isLoading1 && !isLoading2 ? (
                  <ProductCard product={data} />
                ) : (
                  <Box sx={{ display: "flex" }}>
                    {/*Loading*/}
                    <CircularProgress />
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Grid item>
              <Stack
                spacing={2}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Pagination
                  count={Math.ceil(count / limit)}
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%",
          }}
        >
          <Grid item style={{ justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </Grid>
        </Grid>
      )}{" "}
    </>
  );
}

export default ProductList;
