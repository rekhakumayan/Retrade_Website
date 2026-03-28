"use client";

// Shared modal wrapper for reusable overlay dialogs.
import styles from "./Modal.module.css";

export default function Modal({ title, open, children, onClose }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
