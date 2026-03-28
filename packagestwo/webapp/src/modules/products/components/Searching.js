"use client";

import styles from "./Searching.module.css";

function Search({ searchTerm, onSearch }) {

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchInputWrapper}>
      <svg
        className={styles.searchIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search gadgets..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
export default Search;
