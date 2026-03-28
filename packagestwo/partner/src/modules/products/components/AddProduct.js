"use client";

import { useToast } from  "@/sharedComponents/Toast/useToast"
import Select from "react-select";
import styles from "./AddProduct.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "@/modules/products/products.module";
import Button from "@/sharedComponents/Button/Button";
import { getCategories } from "@/modules/categories/categories.module";

export default function AddProduct({ closeModal, editData }) {
  const dispatch = useDispatch();
  const { showToast} = useToast();

  const initialState = {
    name: "",
    price: {
      original: "",
      discount: "",
    },
    currency: "INR",
    stock: "",
    categories: [],
    description: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
        setPreview(reader.result);
      };
    } else if (name === "originalPrice" || name === "discount") {
      setFormData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [name === "originalPrice" ? "original" : "discount"]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const currencyOptions = [
    { value: "INR", label: "₹ Indian Rupee" },
    { value: "USD", label: "$ US Dollar" },
    { value: "EUR", label: "€ Euro" },
    { value: "GBP", label: "£ Pound" },
    { value: "JPY", label: "¥ Yen" },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result;

      if (editData) {
        result = await dispatch(editProduct({
          id: editData._id,
          data: formData
        })
      );
      showToast("success", "Product updated successfully");
        
      } else {
        result = await dispatch(addProduct(formData));

        showToast("success", "Product added successfully");
      }

      setFormData(initialState);
      setPreview(null);
      closeModal();
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong while saving product");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      currency: selectedOption.value
    }));
  };

  const handleCategorySelectChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map(option => option.value)
      : [];

    setFormData(prev => ({
      ...prev,
      categories: values
    }));
  };


  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getCategories())
      setCategories(res.data?.data?.docs || []);
    }
    fetchData();
  }, [dispatch])


  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        price: {
          original: editData.price?.original || "",
          discount: editData.price?.discount || "",
        },
        currency: editData.currency || "INR",
        stock: editData.stock || "",
        categories: editData.categories?.map(cat => cat._id) || [],
        description: editData.description || "",
        image: editData.image || null
      });

      setPreview(editData.image);
    }
  }, [editData]);

  return (

        <form  onSubmit={handleSubmit}>
      
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              PRODUCT NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className={`form-control ${styles.customInput}`}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label small fw-bold text-secondary">
                ORIGINAL PRICE
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.price.original}
                className={`form-control ${styles.customInput}`}
                min="0"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label small fw-bold text-secondary">
                CURRENCY
              </label>
              <Select
                options={currencyOptions}
                value={currencyOptions.find(
                  (option) => option.value === formData.currency
                )}
                onChange={handleCurrencyChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label small fw-bold text-secondary">
                DISCOUNT (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.price.discount}
                className={`form-control ${styles.customInput}`}
                min="0"
                max="100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label small fw-bold text-secondary">
                STOCK
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                className={`form-control ${styles.customInput}`}
                min="0"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">

            <label className="form-label small fw-bold text-secondary">
              CATEGORY
            </label>

            <Select
              isMulti
              options={categoryOptions}
              value={categoryOptions.filter(option =>
                formData.categories.includes(option.value)
              )}
              onChange={handleCategorySelectChange}
            />
          </div>



          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              value={formData.description}
              className={`form-control ${styles.customInput}`}
              rows="2"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">
              PRODUCT IMAGE
            </label>
            <input
              type="file"
              name="image"
              className={`form-control ${styles.customInput}`}
              accept="image/*"
              onChange={handleChange}
            // required={!product}
            />

            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </div>
            )}
          </div>

          <div className={styles.buttonRow}>
            <Button
              type="button"
              onClick={closeModal}
              className={styles.cancelButton}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : editData ? "Update Product" : "List Product"}
            </Button>
          </div>
        </form>

  );
}