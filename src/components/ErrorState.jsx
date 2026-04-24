import styles from "./ErrorState.module.css";

function ErrorState({ title = "Bir hata oluştu", message, onRetry }) {
  return (
    <div className={`${styles.wrapper} panel`}>
      <p className={styles.eyebrow}>Error State</p>
      <h2>{title}</h2>
      <p>{message}</p>

      {onRetry ? (
        <button
          type="button"
          className="button button--danger"
          onClick={onRetry}
        >
          Tekrar Dene
        </button>
      ) : null}
    </div>
  );
}

export default ErrorState;
