import { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import { fetchOrders } from "./services/orderService";

function addMealToCart(items, meal) {
  const existingItem = items.find((item) => item.id === meal.id);

  if (!existingItem) {
    return [...items, { ...meal, quantity: 1 }];
  }

  return items.map((item) =>
    item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

function App() {
  const [activeView, setActiveView] = useState("menu");
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");

  async function loadOrders() {
    setHistoryLoading(true);
    setHistoryError("");

    try {
      const response = await fetchOrders();
      setOrders(response);
    } catch (error) {
      setHistoryError(error.message || "Sipariş geçmişi yüklenemedi.");
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleAddToCart(meal) {
    setCartItems((currentItems) => addMealToCart(currentItems, meal));
    setActiveView("cart");
  }

  function handleIncrease(item) {
    setCartItems((currentItems) => addMealToCart(currentItems, item));
  }

  function handleDecrease(itemId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function handleRemove(itemId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  function handleOrderSuccess(createdOrder) {
    setOrders((currentOrders) => [createdOrder, ...currentOrders]);
    setCartItems([]);
    setActiveView("history");
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <AppLayout
      activeView={activeView}
      cartCount={totalItems}
      onNavigate={setActiveView}
    >
      {activeView === "menu" ? (
        <MenuPage onAddToCart={handleAddToCart} />
      ) : null}

      {activeView === "cart" ? (
        <CartPage
          items={cartItems}
          totalAmount={totalAmount}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onOrderSuccess={handleOrderSuccess}
          onRemove={handleRemove}
        />
      ) : null}

      {activeView === "history" ? (
        <HistoryPage
          error={historyError}
          loading={historyLoading}
          onRefresh={loadOrders}
          orders={orders}
        />
      ) : null}
    </AppLayout>
  );
}

export default App;
