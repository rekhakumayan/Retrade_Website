"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";
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
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className={styles.body}>{children}</div>
    </ReactModal>
  );
}