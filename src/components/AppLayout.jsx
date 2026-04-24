import styles from "./AppLayout.module.css";

const navigationItems = [
  { id: "menu", label: "Menü" },
  { id: "cart", label: "Sepet" },
  { id: "history", label: "Geçmiş" },
];

function AppLayout({ activeView, cartCount, children, onNavigate }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div>
            <p className="pill">React JavaScript Demo</p>
            <h1>Food Order App</h1>
            <p>Menü, sepet ve sipariş geçmişini tek akışta yöneten sade bir React uygulaması.</p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Sayfa sekmeleri">
          {navigationItems.map((item) => {
            const isActive = item.id === activeView;

            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`.trim()}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
                {item.id === "cart" ? (
                  <span className={styles.badge}>{cartCount}</span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default AppLayout;
