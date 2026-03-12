import styles from "./ProductsToolbar.module.css";

export default function ProductsToolbar({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) {
  return (
    <div className={styles.toolbar}>
      
      <div className={styles.searchWrapper}>
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.filters}>
        <button
          className={
            filterStatus === "inStock"
              ? styles.activeFilter
              : ""
          }
          onClick={() => setFilterStatus("inStock")}
        >
          In Stock
        </button>

        <button
          className={
            filterStatus === "lowStock"
              ? styles.activeFilter
              : ""
          }
          onClick={() => setFilterStatus("lowStock")}
        >
          Low Stock
        </button>

        <button
          className={
            filterStatus === "all"
              ? styles.activeFilter
              : ""
          }
          onClick={() => setFilterStatus("all")}
        >
          All
        </button>
      </div>

    </div>
  );
}