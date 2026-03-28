"use client";

import { useState } from "react";
import { useToast } from "@/sharedComponents/Toast/useToast";
import ProductList from "@/modules/products/components/ProductList";
import AddProduct from "@/modules/products/components/AddProduct";
import Modal from "@/sharedComponents/Modal/Modal";
import Header from "@/sharedComponents/Header/Header";
import ProductsToolbar from "@/modules/products/components/ProductsToolbar";
import Button from "@/sharedComponents/Button/Button";
import styles from "./ProductsPage.module.css";
import { deleteProduct } from "@/modules/products/products.module";
import { useDispatch } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteProductId, setDeleteProductId] = useState(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>

        <Header
          title="Inventory Manager"
          subtitle="Manage your product catalog"
          rightContent={
            <Button onClick={() => {
              setSelectedProduct(null);
              setIsOpen(true);
            }}
            >
             <span className="fw-semibold">Add Product</span> 
            </Button>
          }
        />

        <div className={styles.tableCard}>

          <ProductsToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <ProductList
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onEdit={(product) => {
              setSelectedProduct(product);
              setIsOpen(true);
            }}
            onDelete={(id) => setDeleteProductId(id)}
          />

        </div>

        <Modal
          title={selectedProduct ? "Edit Product" : "Add New Product"}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <AddProduct
            closeModal={() => setIsOpen(false)}
            editData={selectedProduct} />
        </Modal>

        <Modal
          title="Delete Product"
          open={!!deleteProductId}
          onClose={() => setDeleteProductId(null)}
        >
          <div className={styles.deleteContent}>
            <p className={styles.deleteMessage}>
              Are you sure you want to delete this product?
            </p>

            <div className={styles.deleteActions}>
              <Button onClick={() => setDeleteProductId(null)}>
                Cancel
              </Button>

              <Button
                className={styles.deleteButton}
                onClick={async () => {
                  try{
                    await dispatch(deleteProduct(deleteProductId));

                    showToast("success", "Product deleted successfully");

                  } catch(error) {
                    showToast("error", "Failed to delete product");
                  } finally{
                    setDeleteProductId(null);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>

      </div>
    </section>
  );
}