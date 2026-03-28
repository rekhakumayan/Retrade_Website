// Module-level page UI for products route.
import ProductList from "@/modules/products/components/ProductList";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Products Module</h1>
        <p>Products state and CRUD thunks are in products.module.js</p>
        <ProductList />
      </div>
    </section>
  );
}
