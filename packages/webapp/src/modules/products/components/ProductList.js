"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/modules/products/products.module";
import { getCategories } from "@/modules/categories/categories.module";
import Card from "@/sharedComponents/Card/Card";
import SearchFilter from "./SearchingFiltering";  
import styles from "./ProductList.module.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const vendorId = searchParams.get("vendorId");
  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { items: categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (vendorId) {
      dispatch(getProducts({ vendorId }));
      dispatch(getCategories({ vendorId }));
    } else {
      dispatch(getProducts({}));
      dispatch(getCategories({}));
    }
  }, [dispatch, vendorId]);

  const handleSearch = (term) => {
    
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      dispatch(getProducts({vendorId}));
    } else {
      dispatch(
        getProducts({
          vendorId,
          "categories[$in]": categoryId
        })
      );
    }
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return products.filter((product) => {
      // Search in product name
      const nameMatch = product.name?.toLowerCase().includes(lowerSearchTerm);
      
      // Search in product description
      const descriptionMatch = product.description?.toLowerCase().includes(lowerSearchTerm);
      
      // Search in product category name (if available)
      const categoryMatch = product.categories?.some(cat =>
        cat.name.toLowerCase().includes(lowerSearchTerm)
      );
      
      // Search in product tags (if available)
      const tagsMatch = product.tags?.some(tag => 
        tag.toLowerCase().includes(lowerSearchTerm)
      );

      return nameMatch || descriptionMatch || categoryMatch || tagsMatch;
    });
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading products...</p>
      </div>
    );
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
      {/* Search and Filter Section */}
      <div className={`${styles.container}`}>
        <SearchFilter
          categories={categories}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className={styles.noResults}>
            <p className={styles.noResultsTitle}>No products found</p>
            <p className={styles.noResultsText}>
              {searchTerm 
                ? `No results for "${searchTerm}". Try adjusting your search.`
                : "Try adjusting your filter"}
            </p>
          </div>
        ) : (
          <div className={styles.cardContainer}>
            {filteredProducts.map((product) => (
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
    </>
  );
}
