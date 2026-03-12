"use client";
import { GoStack } from "react-icons/go";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({
  title,
  description,
  productCount,
  onDelete
}) {

  return (
    <div className={styles.card}>
      <div className="d-flex justify-content-between">
        <div className={styles.icon}><GoStack /></div>
        <button onClick={onDelete} className={styles.deleteBtn}>
          <i className="bi bi-trash"></i>
        </button>
      </div>

      <h4 className=" mb-1 fw-bold">{title}</h4>
      <p className={`text-muted mb-0 small ${styles.description}`}>{description}</p>

      <div className={styles.badge}>
        {productCount} PRODUCTS
      </div>

    </div>
  );
}