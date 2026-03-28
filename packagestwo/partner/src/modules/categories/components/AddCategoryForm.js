"use client";

import { useToast } from "@/sharedComponents/Toast/useToast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory, getCategories } from "@/modules/categories/categories.module";
import Button from "@/sharedComponents/Button/Button";
import styles from "./AddCategoryForm.module.css";

export default function AddCategory({ closeModal, search, page, limit }) {
    const dispatch = useDispatch();
    const { showToast } = useToast();

    const initialState = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState(initialState);

    //HANDLE SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(
            createCategory(formData)
        );
        if (!result?.success) {
            showToast("error", result.message || "Failed to create category"); // using message from thunk
            return;
        }
        await dispatch(getCategories(search, page, limit));
        showToast("success", "Category created successfully");
        setFormData(initialState);
        closeModal();
    };

    //HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">
                        Category
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

                <div className="row g-3 mt-3">
                    <div className="col-6">
                        <Button className={`w-100 ${styles.cancelButton}`} type="button" onClick={closeModal}>
                            <span className="fw-bold"> Cancel</span>
                        </Button>
                    </div>

                    <div className="col-6">
                        <Button className="w-100" type="submit" >
                            <span className="fw-bold">Create</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}