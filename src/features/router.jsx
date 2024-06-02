// src/pages/router.tsx
import { lazy } from "react";
import { Route } from "react-router-dom";

const Auth = lazy(() => import("./auth/router")) ;
const Product = lazy(() => import("./product/router"));

const Router = () => {
  return (
    <>
      <Route path="/auth" element={<Auth />} />
      <Route path="/product" element={<Product />} />
      {/* Ajoutez d'autres routes ici */}
    </>
  );
};

export default Router;
