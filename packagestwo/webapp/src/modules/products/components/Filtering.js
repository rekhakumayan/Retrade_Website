"use client";

import styles from "./Filtering.module.css";
import Button from "@/sharedComponents/Button/Button";

function Filter({
  categories, 
  onCategoryChange, 
  selectedCategory,
  onSortChange
}){

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };
 
  return (
    <div className={styles.FilterContainer}>
      <div className="container-fluid">
        <div className="row align-items-center ">
          {/* Categories */}
          <div className="col-12 col-md-11">
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
          {/* Sort Dropdown */}
          <div className="col-12 col-md-1 text-md-end">
           <div className="dropdown">
            <button
              className="btn btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort
            </button>

            <ul className="dropdown-menu">
              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => onSortChange("default")}
                >
                  Default
                </button>
              </li>

              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => onSortChange("low")}
                >
                  Price Low to High
                </button>
              </li>

              <li>
                <button 
                  className="dropdown-item"
                  onClick={() => onSortChange("high")}
                >
                  Price High to Low
                </button>
              </li>
            </ul>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
}
export default Filter;
