import { useState } from "react";
import { submitOrder } from "../services/orderService";
import styles from "./OrderForm.module.css";

const initialFormState = {
  name: "",
  address: "",
  note: "",
};

function OrderForm({ items, totalAmount, onSuccess }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);

      const createdOrder = await submitOrder({
        customer: formData,
        items,
        totalAmount,
      });

      setFormData(initialFormState);
      onSuccess(createdOrder);
    } catch (requestError) {
      setError(requestError.message || "Sipariş gönderilemedi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`${styles.wrapper} panel`}>
      <div className={styles.heading}>
        <p className="pill">Order Form</p>
        <div>
          <h2>Sipariş Bilgisi</h2>
          <p>Gerçek backend yerine localStorage kullanan basit bir demo akışı.</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Ad Soyad</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Örn: Ayşe Yılmaz"
          />
        </label>

        <label>
          <span>Adres</span>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            placeholder="Mahalle, sokak, apartman bilgisi"
          />
        </label>

        <label>
          <span>Sipariş Notu</span>
          <textarea
            name="note"
            rows="3"
            value={formData.note}
            onChange={handleChange}
            placeholder="İsteğe bağlı"
          />
        </label>

        {error ? <p className={styles.error}>{error}</p> : null}

        {items.length === 0 ? (
          <p className={styles.error}>Sipariş oluşturmak için önce sepete ürün ekle.</p>
        ) : null}

        <button
          type="submit"
          className="button button--brand"
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? "Gönderiliyor..." : "Siparişi Tamamla"}
        </button>
      </form>
    </section>
  );
}

export default OrderForm;
