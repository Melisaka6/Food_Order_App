import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import styles from "./AppLayout.module.css";

function getLinkClassName({ isActive }) {
    return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

function AppLayout() {
    const { totalItems } = useCart();

    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <p className="pill">React Bootcamp Demo</p>
                    <div>
                        <h1>Food Order App</h1>
                        <p>Context, fetch ve routing konularini tek projede toplar.</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <NavLink to="/" className={getLinkClassName} end>
                        Menü
                    </NavLink>
                    <NavLink to="/cart" className={getLinkClassName}>
                        Sepet
                        <span className={styles.badge}>{totalItems}</span>
                    </NavLink>
                    <NavLink to="/history" className={getLinkClassName}>
                        Geçmiş
                    </NavLink>
                </nav>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;