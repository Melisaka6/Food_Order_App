import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import OrderForm from "../components/OrderForm";
import { useCart } from "../hooks/useCart";
import styles from './CartPage.module.css';

function CartPage() {
    const {
        items,
        totalAmount,
        totalItems,
        addItem,
        decreaseItem,
        removeItem,
        clearCart
    } = useCart();

    const [showCheckout, setShowCheckout] = useState(false);
    const [lastOrderId, setLastOrderId] = useState("");

    const handleIncrease = useCallback(
        (item) => {
            addItem(item)
        }, [addItem]
    );

    const handleOrderSuccess = useCallback(
        (createdOrder) => {
            setLastOrderId(createdOrder.id);
            clearCart();
            setShowCheckout(false);
        }, [clearCart]
    );

    const hasItems = items.length > 0;

    return (
        <div className="page-section">
            <section className={`${styles.hero} panel`}>
                <div className="section-heading">
                    <p className="pill">Cart Context</p>
                    <h2>Bu sayfa tamamen global state üstünden çalışıyor.</h2>
                    <p>
                        Menü sayfasında eklenen ürünler burada yeniden fetch edilmeden
                        görüntülenir. Bu da Context API kullanımının en temel örneklerinden biridir.
                    </p>
                </div>

                <div className={styles.summaryCards}>
                    <div>
                        <strong>{totalItems}</strong>
                        <span>Toplam adet</span>
                    </div>
                    <div>
                        <strong>₺{totalAmount.toFixed(2)}</strong>
                        <span>Genel toplam</span>
                    </div>
                </div>
            </section>

            {!hasItems ? (
                <section className={`${styles.emptyState} panel`}>
                    <h2>Sepet şu an boş.</h2>
                    <p>Önce menü sayfasına gidip ürün ekleyebilirsin.</p>

                    {lastOrderId ? (
                        <p className={styles.successText}>
                            Son oluşturulan sipariş: <strong>{lastOrderId}</strong>
                        </p>
                    ) : null}

                    <div className={styles.emptyActions}>
                        <Link className="button button--brand" to="/">
                            Menüye Git
                        </Link>
                    </div>
                </section>
            ) : (
                <section className={styles.content}>
                    <div className={styles.items}>
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrease={handleIncrease}
                                onDecrease={decreaseItem}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    <aside className={`${styles.sidebar} panel`}>
                        <div className={styles.sidebarBlock}>
                            <h3>Sipariş Özeti</h3>
                            <p>
                                {totalItems} ürün, toplam <strong>₺{totalAmount.toFixed(2)}</strong>
                            </p>
                        </div>

                        <div className={styles.sidebarButtons}>
                            <button
                                type="button"
                                className="button button--brand"
                                onClick={() => setShowCheckout((current) => !current)}
                            >
                                {showCheckout ? "Formu Gizle" : "Siparişe Geç"}
                            </button>

                            <button
                                type="button"
                                className="button button--danger"
                                onClick={clearCart}
                            >
                                Sepeti Temizle
                            </button>
                        </div>
                    </aside>
                </section>
            )}

            {hasItems && showCheckout ? (
                <OrderForm
                    items={items}
                    totalAmount={totalAmount}
                    onSuccess={handleOrderSuccess}
                />
            ) : null}
        </div>
    );
}

export default CartPage;
