"use client";

// Products UI component:
// Fetches and displays product items from Redux state.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/modules/products/products.module";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Initial products fetch when component mounts.
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <ul className={styles.list}>
      {items.map((product) => (
        <li key={product._id || product.id} className={styles.item}>
          <h4>{product.name || "Untitled Product"}</h4>
          <p>{product.description || "No description"}</p>
        </li>
      ))}
      {!items.length ? <li>No products found.</li> : null}
    </ul>
  );
}
