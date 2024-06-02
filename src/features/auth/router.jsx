// src/pages/router.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
