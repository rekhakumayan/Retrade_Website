"use client";

import styles from "../pages/PartnerProfilePage.module.css";

export default function PersonalInfoCard({
  formData,
  user,
  isEditing,
  setFormData,
  errors,
}) {
  return (
    <div className={styles.card}>
      <h3>Personal Information</h3>

      <label>Name</label>
      <input
        className={styles.input}
        value={formData?.name ?? user?.name ?? ""}
        disabled={!isEditing}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      {errors?.name && <p className={styles.error}>{errors.name}</p>}

      <label>Email</label>
      <input
        className={styles.input}
        value={user?.email || ""}
        disabled
      />

      <label>Role</label>
      <input
        className={styles.input}
        value={user?.role || ""}
        disabled
      />

      <label>Avatar</label>
      <input
        type="file"
        accept="image/*"
        disabled={!isEditing}
        onChange={(e) => {
          const file = e.target.files[0];

          if (!file) return;
          const previewUrl = URL.createObjectURL(file);

          setFormData((prev) => ({
            ...prev,
            avatar: file,
            preview: previewUrl, 
          }));
        }}
      />

      {(formData?.preview || user?.avatar) && (
        <img
          src={formData?.preview || user?.avatar}
          alt="avatar"
          style={{ width: 80, height: 80, borderRadius: "50%",objectFit: "cover", marginTop:"10px" }}
        />
      )}
    </div>
  );
}