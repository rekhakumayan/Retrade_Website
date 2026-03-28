import styles from "../styles/ProfileTabs.module.css";

export default function AddressCard({
  addr,
  userName,
  onEdit,
  onDelete,
  onSetDefault,
  isAddNew = false,
  onAddNew,
}) {
  if (isAddNew) {
    return (
      <button
        type="button"
        className={`${styles.addAddressBtn} d-flex flex-column align-items-center justify-content-center gap-2`}
        onClick={onAddNew}
      >
        <span style={{ fontSize: 22 }}>+</span>
        <span className={styles.addAddressLabel}>New Delivery Location</span>
      </button>
    );
  }

  return (
    <div
      className={`${styles.addressCard} p-3 d-flex flex-column justify-content-between`}
    >
      <div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className={styles.addressTag}>{addr.tag}</span>
          {addr.isDefault && (
            <span className={styles.defaultBadge}>Selected</span>
          )}
        </div>
        <p className={styles.addressName}>{userName}</p>
        <p className={`${styles.addressText} mt-1`}>
          {addr.houseNo}, {addr.street}, {addr.city}, {addr.pincode},{" "}
          {addr.country}
        </p>
      </div>
      <div className={`${styles.addressActions} d-flex gap-3 mt-3 pt-3`}>
        <button
          type="button"
          className={styles.editBtn}
          onClick={() => onEdit(addr)}
        >
          Edit Address
        </button>
        {!addr.isDefault && (
          <button
            type="button"
            className={styles.setDefaultBtn}
            onClick={() => onSetDefault(addr._id)}
          >
            Set as Default
          </button>
        )}
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => onDelete(addr._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
