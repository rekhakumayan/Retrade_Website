"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../categories.module";
import AddCategory from "@/modules/categories/components/AddCategoryForm";
import Modal from "@/sharedComponents/Modal/Modal";
import Header from "@/sharedComponents/Header/Header";
import Button from "@/sharedComponents/Button/Button";
import SearchBar from "@/sharedComponents/SearchBar/SearchBar";
import CategoryCard from "../components/CategoryCard";
import styles from "./CategoryPage.module.css"

export default function CategoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const { items: categories, loading, error } = useSelector((state) => state.categories)
  // HANDLE SEARCH
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setPage(1)
  }

  //HANDLE DELETE
  const handleDelete = async (id) => {
    const result = await dispatch(deleteCategory(id));
    if (!result?.success) {
      alert(result.message || "Something went wrong");
      return;
    }
    alert("Category deleted successfully");
    await dispatch(getCategories(search, page, 6));
  };

  //GET CATEGORIES
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getCategories(search, page, 6))
      if (result?.status === 200) {
        setTotalPages(result.data.data.totalPages);
      }
    }
    fetchData();
  }, [page, search, dispatch])

  // FORMAT-PRODUCT-NAMES
  const formatProductNames = (names = []) => {
    if (!names.length) return "No products available";

    if (names.length === 1) {
      return names[0];
    }
    if (names.length === 2) {
      return `${names[0]} and ${names[1]}`;
    }
    if (names.length === 3) {
      return `${names[0]}, ${names[1]} and ${names[2]}`;
    }
    const firstThree = names.slice(0, 3).join(", ");
    return `${firstThree} ...`;
  };


  return (
    <section className="container-fluid py-4">
      <div className="container">

        {/* Header Section */}
        <Header
          title="Taxonomy"
          subtitle="Manage your shop categories and departments"
          rightContent={
            <Button
              onClick={() => setIsOpen(true)}
              className="w-100 w-md-auto text-nowrap"
            >
              <span className="fw-bold">Add Category</span>
            </Button>
          }
        />
        {/* Card Container */}
        <div className="bg-white rounded-4 border shadow-sm p-4">

          <div className="row mb-4">
            <div className="col-12 col-md-6 col-lg-4">
              <SearchBar
                placeholder="Search categories..."
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Categories Grid */}

          {loading ? (
            <div className="text-center my-4">Loading...</div>
          ) : (
            <div className="row mt-4">
              {categories?.map((category) => (
                <div
                  key={category._id}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4"
                >
                  <CategoryCard
                    title={category.name}
                    description={formatProductNames(category.productNames)}
                    productCount={category.productCount}
                    onDelete={() => handleDelete(category._id)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Prev and next button  */}

          <div className={styles.pagination}>
          <Button
            className={styles.pageButton}
            disabled={page === 1}
            onClick={() =>setPage((prev)=>prev-1) }
          >
            Previous
          </Button>

          <span style={{  }}>
            Page {page} of {totalPages}
          </span>

          <Button
            className={styles.pageButton}
            disabled={page === totalPages}
            onClick={() => setPage((prev)=>prev+1)}
          >
            Next
          </Button>
        </div>
        </div>

        {/* Modal */}
        <Modal
          title="Create New Category"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <AddCategory closeModal={() => setIsOpen(false)} search={search} page={page} limit={6} />
        </Modal>
      </div>
    </section>
  );
}