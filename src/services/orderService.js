const STORAGE_KEY = "food-order";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readOrdersFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return [];
  }
}

function writeOrdersToStorage(orders) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export async function submitOrder(orderPayload) {
  await wait(800);

  if (!orderPayload.customer.name.trim() || !orderPayload.customer.address.trim()) {
    throw new Error("Ad soyad ve adres alanı zorunludur.");
  }

  const newOrder = {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...orderPayload,
  };

  const currentOrders = readOrdersFromStorage();

  writeOrdersToStorage([newOrder, ...currentOrders]);

  return newOrder;
}

export async function fetchOrders() {
  await wait(500);
  return readOrdersFromStorage();
}
