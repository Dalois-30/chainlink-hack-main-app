import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./shared/components"
import AuthRoutes from "./features/auth/router"
import ProductRoutes from "./features/product/router"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="products/*" element={<ProductRoutes />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
