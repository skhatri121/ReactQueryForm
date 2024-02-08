import { Route, Routes } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import EditProduct from "./Components/EditProduct";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />

        <Route />
      </Routes>
    </>
  );
}

export default App;
