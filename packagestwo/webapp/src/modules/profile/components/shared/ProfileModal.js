"use client";
import styles from "./ProfileModal.module.css";
import CloseIcon from "@/app/assets/icons/CloseIcon";
import Button from "@/sharedComponents/Button/Button";
import ChevronRightIcon from "@/app/assets/icons/ChevronRightIcon";

export default function ProfileModal({
  onClose,
  title,
  onSave,
  saveLabel = "Save Changes",
  loading = false,
  disabled = false,
  children,
}) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div
          className={`${styles.modalDialog} d-flex align-items-start justify-content-center`}
        >
          <div className={styles.modalCard}>
            <div
              className={`${styles.modalHeader} d-flex align-items-center justify-content-between p-4`}
            >
              <p className={styles.modalTitle}>{title}</p>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-4">{children}</div>

            <div
              className={`${styles.modalFooter} d-flex justify-content-end gap-2 p-4`}
            >
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={onSave}
                disabled={loading || disabled}
              >
                {loading ? "Saving..." : saveLabel}
                {!loading && !disabled && <ChevronRightIcon />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
