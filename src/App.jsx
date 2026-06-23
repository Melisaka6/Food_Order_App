//root yapisi

import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";

const MenuPage = lazy(() => import("./pages/MenuPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const HistoryPage = lazy(() => import("./pages/HistoryPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

function App() {
  return (
    <Suspense fallback={<PageLoader label="Sayfa yükleniyor..." />}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<MenuPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;