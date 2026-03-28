"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./styles/OrderSummary.module.css";

const OrderSummary = ({
  subtotal = 0,
  gst = 0,
  deliveryText = "Free",
  itemCount = 0,
  total = 0,
}) => {

  const router = useRouter();

  const numericSubtotal = Number(subtotal) || 0;
  const numericGst = Number(gst) || 0;
  const numericTotal = Number(total) || numericSubtotal + numericGst;

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
          <span className={styles.label}>
            Subtotal ({itemCount} items)
          </span>
          <span className={styles.value}>
            {formatCurrency(numericSubtotal)}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>GST (18%)</span>
          <span className={styles.value}>
            {formatCurrency(numericGst)}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Delivery</span>
          <span className={`${styles.value} ${styles.free}`}>
            {deliveryText}
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>
            Total Amount
          </span>
          <span className={`${styles.totalPrice} ${styles.totalValue}`}>
            {formatCurrency(numericTotal)}
          </span>
        </div>

      </div>

      <button
        className={styles.checkoutBtn}
        onClick={() => router.push("/checkout")}
      >
        Checkout
      </button>

    </div>
  );
};

export default OrderSummary;