import styles from "./SearchBar.module.css";

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}) {
   return (
    <div className={`${styles.wrapper} w-100`}>
      <i className={`bi bi-search ${styles.icon}`}></i>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}