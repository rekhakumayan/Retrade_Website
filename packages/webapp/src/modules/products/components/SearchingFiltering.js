"use client";

import { useState } from "react";
import styles from "./SearchingFiltering.module.css";
import Button from "@/sharedComponents/Button/Button";

function SearchFilter({
  categories,
  onSearch,
  onCategoryChange,
  selectedCategory,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className={styles.searchFilterContainer}>
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Search */}
          <div className="col-12  col-md-3 col-lg-3 mb-3 mb-md-0">
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
          </div>

          {/* Categories */}
          <div className="col-12   col-md-9 col-lg-9">
            <div className={styles.categoryFilters}>
              <Button
                variant={selectedCategory === "all" ? "primary" : "outline"}
                onClick={() => handleCategoryClick("all")}
              >
                 <svg
                  className={styles.categoryIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                > 
                  <rect x="3" y="3" width="7" height="7"></rect>{" "}
                  <rect x="14" y="3" width="7" height="7"></rect>{" "}
                  <rect x="14" y="14" width="7" height="7"></rect>{" "}
                  <rect x="3" y="14" width="7" height="7"></rect>{" "}
                </svg>
                All
              </Button>

              {categories?.map((category) => (
                <Button
                  key={category._id}
                  variant={
                    selectedCategory === category._id ? "primary" : "outline"
                  }
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchFilter;

