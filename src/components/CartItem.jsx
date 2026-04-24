import { memo } from "react";
import styles from "./CartItem.module.css";

const CartItem = memo(function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <strong>₺{(item.price * item.quantity).toFixed(2)}</strong>
      </div>

      <div className={styles.actions}>
        <div className={styles.counter}>
          <button type="button" onClick={() => onDecrease(item.id)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onIncrease(item)}>
            +
          </button>
        </div>

        <button
          type="button"
          className={`${styles.removeButton} button button--ghost`}
          onClick={() => onRemove(item.id)}
        >
          Kaldır
        </button>
      </div>
    </article>
  );
});

export default CartItem;
