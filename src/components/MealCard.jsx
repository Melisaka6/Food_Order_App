import { memo } from "react";
import styles from "./MealCard.module.css";

// React.memo: Parent render olsa bile props aynıysa kartı tekrar çizmez.
const MealCard = memo(function MealCard({ meal, onAdd }) {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.category}>{meal.category}</span>
        <strong className={styles.price}>₺{meal.price.toFixed(2)}</strong>
      </div>

      <h3>{meal.name}</h3>
      <p>{meal.description}</p>

      <button type="button" className="button button--brand" onClick={() => onAdd(meal)}>
        Sepete Ekle
      </button>
    </article>
  );
});

export default MealCard;
