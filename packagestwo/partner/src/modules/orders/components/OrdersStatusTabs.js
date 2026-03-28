"use client";

import styles from "./OrdersStatusTabs.module.css";

const statuses = [
  "all",
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "placed"
];

export default function OrdersStatusTabs({ statusFilter, setStatusFilter }) {
  return (
    <div className={styles.tabsWrapper}>
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`${styles.tabButton} ${
            statusFilter === status ? styles.active : ""
          }`}
        >
          {status.toUpperCase()}
        </button>
      ))}
    </div>
  );
}