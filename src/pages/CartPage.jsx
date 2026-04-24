import CartItem from "../components/CartItem";
import OrderForm from "../components/OrderForm";
import styles from "./CartPage.module.css";

function CartPage({
  items,
  totalAmount,
  onDecrease,
  onIncrease,
  onOrderSuccess,
  onRemove,
}) {
  return (
    <div className={styles.layout}>
      <section className={`${styles.summary} panel`}>
        <div className="section-heading">
          <p className="pill">Cart</p>
          <h2>Sepet</h2>
          <p>Seçtiğin ürünleri gözden geçirip siparişi tamamlayabilirsin.</p>
        </div>

        <div className={styles.metrics}>
          <div>
            <span>Ürün adedi</span>
            <strong>{items.reduce((total, item) => total + item.quantity, 0)}</strong>
          </div>
          <div>
            <span>Toplam tutar</span>
            <strong>₺{totalAmount.toFixed(2)}</strong>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`${styles.items} panel`}>
          <div className="section-heading">
            <h3>Sepettekiler</h3>
            <p>
              {items.length > 0
                ? "Adetleri güncelleyebilir veya ürünü çıkarabilirsin."
                : "Henüz sepete ürün eklenmedi."}
            </p>
          </div>

          {items.length > 0 ? (
            <div className={styles.itemList}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onDecrease={onDecrease}
                  onIncrease={onIncrease}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Menü sekmesine dönüp bir ürün ekleyerek başlayabilirsin.</p>
            </div>
          )}
        </div>

        <div className={styles.formColumn}>
          <OrderForm
            items={items}
            totalAmount={totalAmount}
            onSuccess={onOrderSuccess}
          />
        </div>
      </section>
    </div>
  );
}

export default CartPage;
