"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/modules/products/products.module";
import styles from "./ProductList.module.css";
import Button from "@/sharedComponents/Button/Button"


export default function ProductList({ searchTerm, filterStatus, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const { items, loading, error,totalPages } = useSelector(
    (state) => state.products
  );
   const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(
      getProducts({
        search: searchTerm,
        stock: filterStatus === "all" ? "" : filterStatus,
        page: currentPage,
      })
    );
  }, [dispatch, searchTerm, filterStatus, currentPage]);

  const filteredItems = items;

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return styles.statusApproved;
      case "pending":
        return styles.statusPending;
      case "rejected":
        return styles.statusRejected;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>

          <thead>
            <tr>
              <th>PRODUCT INFO</th>
              <th>CATEGORY</th>
              <th>PRICING</th>
              <th>STOCK</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.empty}>
                  No products found.
                </td>
              </tr>
            ) : (
              filteredItems.map((product) => {
                const stock = product.stock || 0;

                return (
                  <tr key={product._id}>
                    <td>
                      <div className={styles.productInfo}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.productImage}
                        />

                        <div className={styles.productText}>
                          <div className={styles.productName}>
                            {product.name}
                          </div>
                          <div className={styles.productDescription}>
                            {product.description || "No description"}
                          </div>
                        </div>
                      </div>

                    </td>
                    <td>
                      {product.categories?.length
                        ? product.categories.map(cat => cat.name).join(", ")
                        : "-"}
                    </td>
                    <td className={styles.pricing}>
                      $
                      {product.price?.final ||
                        product.price?.original ||
                        product.price ||
                        0}
                    </td>
                    <td className={styles.stocking}>{stock} units</td>
                    <td>
                      <span className={getStatusClass(product.status)}>
                        {product.status?.toUpperCase() || "N/A"}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <i className={`bi bi-pencil ${styles.editIcon}`}
                        onClick={() => onEdit(product)}
                      ></i>
                      <i
                        className={`bi bi-trash ${styles.deleteIcon}`}
                        onClick={() =>
                          onDelete(product._id)
                        }
                      ></i>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <Button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() =>setCurrentPage((prev)=>prev-1) }
          >
            Previous
          </Button>

          <span style={{  }}>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            className={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev)=>prev+1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>

  );
}