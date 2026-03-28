"use client";

import styles from "./styles/OrderSummary.module.css";

const OrderSummary = ({ cartItems = [] }) => {

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const gst = +(subtotal * 0.12).toFixed(2);
  const deliveryCharge = 0;
  const grandTotal = +(subtotal + gst + deliveryCharge).toFixed(2);

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  return (
    <div className={styles.card}>

      <h4 className={styles.title}>Order Summary</h4>

      <hr className={styles.divider} />

      <div className={styles.itemsList}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <span className={styles.itemName}>
                {item.quantity} × {item.name}
              </span>

              <span className={styles.itemPrice}>
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))
        ) : (
          <p className={styles.empty}>No items in cart</p>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.summaryRows}>

        <div className={styles.row}>
          <span className={styles.sbtitle}>Subtotal</span>
          <span className={styles.value}>{formatCurrency(subtotal)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.sbtitle}>GST (12%)</span>
          <span className={styles.value}>{formatCurrency(gst)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.sbtitle}>Logistics</span>
          <span className={styles.free}>FREE</span>
        </div>

        <hr className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>GRAND TOTAL</span>
          <span className={styles.totalPrice}>
            {formatCurrency(grandTotal)}
          </span>
        </div>

      </div>

    </div>
  );
};

export default OrderSummary;