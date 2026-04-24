import styles from "./PageLoader.module.css";

function PageLoader({ label = "Yükleniyor..." }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <p>{label}</p>
    </div>
  );
}

export default PageLoader;
