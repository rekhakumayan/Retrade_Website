"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import styles from "./Modal.module.css";

export default function Modal({ title, open, children, onClose }) {
  useEffect(() => {
    ReactModal.setAppElement("body");
  }, []);

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
      bodyOpenClassName={styles.bodyOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      closeTimeoutMS={200}
    >
      <div className={styles.header}>
        <h4 className="fw-bold ">{title}</h4>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
        >
          <RxCross2 className="fw-semibold fs-4" />
        </button>
      </div>

      <div className={styles.body}>{children}</div>
    </ReactModal>
  );
}