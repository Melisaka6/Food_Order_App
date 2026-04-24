function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchMeals() {
  const response = await fetch("/api/meals.json");

  await wait(700);

  if (!response.ok) {
    throw new Error("Menü verisi yüklenemedi.");
  }

  const data = await response.json();
  return data.meals;
}
