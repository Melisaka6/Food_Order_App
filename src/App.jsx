import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";



function App() {
  return (
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<MenuPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
  );
}

export default App;