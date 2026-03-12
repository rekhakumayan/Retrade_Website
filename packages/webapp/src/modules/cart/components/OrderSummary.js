"use client";

import React from "react";
import styles from "./styles/OrderSummary.module.css";

const OrderSummary = ({ subtotal = 0 }) => {
  const numericSubtotal = Number(subtotal) || 0;

  const gst = +(numericSubtotal * 0.12).toFixed(2);
  const total = +(numericSubtotal + gst).toFixed(2);

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  return (
    <div className={styles.summaryCard}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.summaryRows}>
       <div className={styles.row}>
         <span className={styles.label}>Subtotal</span>
         <span className={styles.value}>
            {formatCurrency(numericSubtotal)}
          </span>
       </div>

       <div className={styles.row}>
         <span className={styles.label}>GST (12%)</span>
         <span className={styles.value}>
            {formatCurrency(gst)}
         </span>
       </div>

       <div className={styles.row}>
        <span className={styles.label}>Delivery</span>
          <span className={`${styles.value} ${styles.free}`}>
           FREE
         </span>
        </div>
     

      <div className={styles.divider} />

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total Amount</span>
        <span className={`${styles.totalPrice} ${styles.totalValue}`}>
          {formatCurrency(total)}
        </span>
      </div>
    </div>

      <button 
         className={styles.checkoutBtn}>
         Checkout
      </button>
    </div>
  );
};

export default OrderSummary;