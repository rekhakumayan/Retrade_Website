"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/DeliveryDetails.module.css";
import AddAddressModal from "@/modules/profile/components/AddAddressModal";
import { addAddress, fetchUser } from "@/modules/user/user.module";
import { selectUserAddresses } from "@/modules/user/user.selectors";
import { selectCurrentUser } from "@/modules/auth/auth.selectors";

const DeliveryDetails = ({ onReview }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const addresses = useSelector(selectUserAddresses);
  const userId = user?.userId;

  const defaultAddress =
    addresses.find((a) => a.isDefault) || addresses[0] || null;
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (defaultAddress && !selectedAddressId) {
      setSelectedAddressId(defaultAddress._id);
    }
  }, [defaultAddress]);

  useEffect(() => {
    if (userId) dispatch(fetchUser(userId));
  }, [userId, dispatch]);

  const handleSaveAddress = async (formData) => {
    const payload = {
      tag: formData.tag,
      houseNo: formData.houseNo,
      street: formData.street,
      city: formData.city,
      pincode: formData.pincode,
      country: formData.country,
    };
    await dispatch(addAddress({ userId, payload }));
    await dispatch(fetchUser(userId));
    setShowModal(false);
  };

  const handleAddNew = () => {
    if (addresses.length >= 4) {
      alert("You can only add up to 4 addresses");
      return;
    }
    setShowModal(true);
  };

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Delivery Details</h3>
        <button className={styles.addAddressBtn} onClick={handleAddNew}>
          + Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className={styles.emptyAddress}>
          <p className={styles.emptyAddressText}>
            No address added yet. Please add a delivery address.
          </p>
        </div>
      ) : (
        <>
          <div className="row g-3">
            {addresses.map((addr) => {
              const isSelected = selectedAddressId === addr._id;
              return (
                <div key={addr._id} className="col-md-6 col-12">
                  <div
                    className={`${styles.addressCard} ${isSelected ? styles.addressCardSelected : ""}`}
                    onClick={() => setSelectedAddressId(addr._id)}
                  >
                    <div
                      className={`d-flex align-items-center justify-content-between`}
                    >
                      <span className={styles.addressTag}>{addr.tag}</span>
                      {isSelected && (
                        <span className={styles.selectedTick}>✓</span>
                      )}
                    </div>
                    <h4 className={styles.name}>{user?.name}</h4>
                    <p className={styles.address}>
                      {addr.houseNo}, {addr.street}, {addr.city}, {addr.pincode}
                      , {addr.country}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actionWrapper}>
            <button
              className={styles.primaryBtn}
              onClick={() => onReview(selectedAddress)}
            >
              Review →
            </button>
          </div>
        </>
      )}

      {showModal && (
        <AddAddressModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveAddress}
        />
      )}
    </div>
  );
};

export default DeliveryDetails;
