// src/pages/router.tsx

import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/Product-list";
import ProductDetail from "./pages/Product-detail"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/:idProduct" element={<ProductDetail />} />
    </Routes>
  );
};

export default Router;
