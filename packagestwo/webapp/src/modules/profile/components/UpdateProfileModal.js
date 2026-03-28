"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./shared/ProfileModal";
import styles from "./shared/ProfileModal.module.css";
import { selectCurrentUser } from "@/modules/auth/auth.selectors";
import { setUser } from "@/modules/auth/auth.module";
import { updateUserName } from "@/modules/user/user.module";

export default function UpdateProfileModal({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) setName(user.name || "");
  }, [user]);

  const validate = () => {
    const e = {};
    if (!name.trim() || name.trim().length < 3)
      e.name = "Name must be at least 3 characters";
    if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name.trim()))
      e.name = "Name can only contain letters";
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch(
        updateUserName({ userId: user.userId, name: name.trim() }),
      ).unwrap();
      dispatch(setUser({ ...user, name: res.data.name }));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      setErrors({ api: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileModal
      title="Update Personal Info"
      onClose={onClose}
      onSave={handleSave}
      saveLabel="Save Changes"
      loading={loading}
      disabled={success}
    >
      {errors.api && <div className={styles.apiError}>{errors.api}</div>}
      {success && (
        <div className={styles.apiSuccess}>Profile updated successfully!</div>
      )}

      <div className="mb-3">
        <p className={styles.fieldLabel}>Full Name</p>
        <input
          className={styles.fieldInput}
          placeholder="e.g. Rahul Sharma"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({});
          }}
        />
        {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
      </div>

      <div className="mb-1">
        <p className={styles.fieldLabel}>Email Address</p>
        <input
          className={styles.fieldInput}
          readOnly
          value={user?.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
      </div>
    </ProfileModal>
  );
}
