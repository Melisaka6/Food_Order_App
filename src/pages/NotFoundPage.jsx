import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <section className={`${styles.wrapper} panel`}>
      <p className="pill">404</p>
      <h2>Aradığın sayfa bulunamadı.</h2>
      <p>
        Routing anlatımında özellikle `*` route kullanıp 404 sayfası eklemek iyi bir pratiktir.
      </p>
      <Link className="button button--brand" to="/">
        Ana Sayfaya Dön
      </Link>
    </section>
  );
}

export default NotFoundPage;
