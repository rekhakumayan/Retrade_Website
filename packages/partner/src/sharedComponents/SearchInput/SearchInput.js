"use client";

import styles from "./SearchInput.module.css";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search..."
}) {
  return (
    <div className={styles.searchWrapper}>
      <i className={`bi bi-search ${styles.icon}`}></i>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}