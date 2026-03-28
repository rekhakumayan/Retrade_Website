"use client";

import { updateUserAvatar } from "../partnerProfile.module";
import Header from "@/sharedComponents/Header/Header";
import { useToast } from "@/sharedComponents/Toast/useToast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerProfile, updateUserProfile } from "../partnerProfile.module";
import Button from "@/sharedComponents/Button/Button";
import styles from "../pages/PartnerProfilePage.module.css";

import PersonalInfoCard from "../components/PersonalInfo";
import BusinessInfoCard from "../components/BusinessInfo";

export default function PartnerProfilePage() {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(
    (state) => state.partnerProfile
  );
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    if (!user) return;

    const userId = user.userId || user._id;

    if (!userId) {
      return;
    }


    dispatch(getPartnerProfile());
  }, [user, dispatch]);


  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!formData.name) {
      setErrors({ name: "Name is required" });
      showToast("error", "Name is required");
      return;
    }

    try {
      await dispatch(updateUserProfile({ name: formData.name }));

       if (formData.avatar) {
      await dispatch(updateUserAvatar(formData.avatar));
    }
     // dispatch(getPartnerProfile());


      setIsEditing(false);

      showToast("success", "Profile updated successfully");
    } catch {
      showToast("error", "Update failed");
    }
  };

  return (
    <div className={styles.container}>
      <Header
        title="Partner Profile"
        subtitle="View and manage your personal and business details"
      />

      <PersonalInfoCard
        formData={formData}
        user={user}
        profile={profile}
        isEditing={isEditing}
        setFormData={setFormData}
        errors={errors}
      />

      <BusinessInfoCard profile={profile} />

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <Button onClick={handleSave} disabled={loading}>Save</Button>
            <Button onClick={handleCancel} className={styles.cancelButton}>Cancel</Button>
          </>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}
      </div>
    </div>
  );
}