import {useMemo, useState } from "react";
import ErrorState from "../components/ErrorState";
import MealCard from "../components/MealCard";
import PageLoader from "../components/PageLoader";
import styles from "./MenuPage.module.css";
import { useMeals } from "../hooks/useMeals";

function MenuPage({ onAddToCart }) {
  const{meals,loading,error,refetch} = useMeals();
  const [searchTerm, setSearchTerm] = useState("");


  const filteredMeals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("tr-TR");

    if (!normalizedSearch) {
      return meals;
    }

    return meals.filter((meal) => {
      const mealName = meal.name.toLocaleLowerCase("tr-TR");
      const mealCategory = meal.category.toLocaleLowerCase("tr-TR");

      return (
        mealName.includes(normalizedSearch) ||
        mealCategory.includes(normalizedSearch)
      );
    });
  }, [meals, searchTerm]);

  const categoryCount = useMemo(
    () => new Set(meals.map((meal) => meal.category)).size,
    [meals],
  );

  return (
    <div className="page-section">
      <section className={`${styles.hero} panel`}>
        <div className="section-heading">
          <p className="pill">Menu Page</p>
          <h2>Menü</h2>
          <p>Tüm ürünleri inceleyip tek tıkla sepete ekleyebilirsin.</p>
        </div>

        <div className={styles.heroStats}>
          <div>
            <strong>{meals.length}</strong>
            <span>Toplam ürün</span>
          </div>
          <div>
            <strong>{categoryCount}</strong>
            <span>Kategori</span>
          </div>
        </div>
      </section>

      <section className={`${styles.toolbar} panel`}>
        <label className={styles.search}>
          <span>Menü içinde ara</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Burger, tatlı, içecek..."
          />
        </label>
      </section>

      {loading ? <PageLoader label="Menü yükleniyor..." /> : null}

      {!loading && error ? (
        <ErrorState
          title="Menü yüklenemedi"
          message={error}
          onRetry={loadMeals}
        />
      ) : null}

      {!loading && !error ? (
        filteredMeals.length > 0 ? (
          <section className={styles.grid}>
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onAdd={onAddToCart} />
            ))}
          </section>
        ) : (
          <section className={`${styles.emptyState} panel`}>
            <h3>Aramaya uygun ürün bulunamadı.</h3>
            <p>Farklı bir kelime deneyebilir veya aramayı temizleyebilirsin.</p>
          </section>
        )
      ) : null}
    </div>
  );
}

export default MenuPage;
