import { Route, Routes } from "react-router-dom";
import Form from "./Components/Form";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products/:id/edit" element={<Form />} />

        <Route />
      </Routes>
    </>
  );
}

export default App;
