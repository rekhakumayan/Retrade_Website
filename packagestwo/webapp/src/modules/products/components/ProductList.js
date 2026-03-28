"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getProducts } from "@/modules/products/products.module";
import { getCategories } from "@/modules/categories/categories.module";
import Card from "@/sharedComponents/Card/Card";
import Filter from "./Filtering";  
import styles from "./ProductList.module.css";
import Spinner from "@/sharedComponents/Loader/Spinner";
import { getVendorId } from "@/utils/helperFunction";

export default function ProductList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const vendorId = getVendorId()
  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );

  const category = searchParams.get("category") || "all";
  
  const sortOrder = searchParams.get("sort") || "default";
  
  const { items: categories } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (!vendorId) return; 
    const params = {
      vendorId,
    };

    if (search) {
      params.search = search;
    }

    if (category !== "all") {
      params["categories[$in]"] = category;
    }

    if (sortOrder === "low") {
      params.sort = "priceLow";
    }

    if (sortOrder === "high") {
      params.sort = "priceHigh";
    }

    dispatch(getProducts(params));
    dispatch(getCategories({ vendorId }));
  }, [dispatch, vendorId, category, search, sortOrder]);

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    router.replace(`/products?${params.toString()}`);
  };

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.replace(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  if (loading) {
    return <Spinner size="large" fullPage />;
  }
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Filter Section */}
      <div>
        <div className={`${styles.container}`}>
          <Filter
            categories={categories}
            onCategoryChange={handleCategoryChange}
            selectedCategory={category}
            onSortChange={handleSortChange}
          /> 

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className={styles.noResults}>
              <p className={styles.noResultsTitle}>No products found</p>
              <p className={styles.noResultsText}>
                Try adjusting your filter
              </p>
            </div>
          ) : (
            <div className={styles.cardContainer}>
              {products.map((product) => (
                <div key={product._id} className={styles.cardWrapper}>
                  <Card
                    product={product}
                    onSelectProduct={(id) =>
                      console.log("Selected product:", id)
                    }
                  />
                </div>
              ))}
            </div>
          )}  
          
        </div>
         
      </div>
    </>
  );
}
