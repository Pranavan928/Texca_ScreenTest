import "./App.css";
import ProductList from "./components/productList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:_category" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
