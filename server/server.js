// server.js
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000; // Set the desired port number
const cors = require("cors");
const bodyParser = require("body-parser");

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use("/api/products", require("./routes/products.route"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
