import ErrorState from "../components/ErrorState";
import PageLoader from "../components/PageLoader";
import styles from "./HistoryPage.module.css";

function formatDate(dateString) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

function HistoryPage({ error, loading, onRefresh, orders }) {
  return (
    <div className="page-section">
      <section className={`${styles.hero} panel`}>
        <div className="section-heading">
          <p className="pill">History</p>
          <h2>Sipariş Geçmişi</h2>
          <p>localStorage içine kaydedilen siparişleri burada görebilirsin.</p>
        </div>

        <button type="button" className="button button--ghost" onClick={onRefresh}>
          Yenile
        </button>
      </section>

      {loading ? <PageLoader label="Sipariş geçmişi yükleniyor..." /> : null}

      {!loading && error ? (
        <ErrorState
          title="Siparişler alınamadı"
          message={error}
          onRetry={onRefresh}
        />
      ) : null}

      {!loading && !error ? (
        orders.length > 0 ? (
          <section className={styles.list}>
            {orders.map((order) => (
              <article key={order.id} className={`${styles.card} panel`}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3>{order.customer.name}</h3>
                    <p>{order.customer.address}</p>
                  </div>
                  <div className={styles.meta}>
                    <strong>{order.id}</strong>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                <div className={styles.items}>
                  {order.items.map((item) => (
                    <div key={item.id} className={styles.itemRow}>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <strong>₺{(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <span>Not: {order.customer.note?.trim() || "Yok"}</span>
                  <strong>Toplam: ₺{Number(order.totalAmount).toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className={`${styles.emptyState} panel`}>
            <h3>Henüz sipariş yok.</h3>
            <p>Sepetten sipariş tamamladığında geçmiş burada görünecek.</p>
          </section>
        )
      ) : null}
    </div>
  );
}

export default HistoryPage;
