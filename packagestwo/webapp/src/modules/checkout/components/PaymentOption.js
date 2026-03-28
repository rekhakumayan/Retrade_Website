"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles/PaymentOption.module.css";

const PaymentOptions = ({ onBack, onConfirmOrder, totalPrice }) => {
  const [selected, setSelected] = useState("cod");

  return (
    <div className={`card p-4 ${styles.cardWrapper}`}>

      <h5 className="fw-bold mb-4">Payment Selection</h5>

      <div
        className={`d-flex justify-content-between align-items-center rounded-4 p-3 mb-3 ${styles.option} ${
          selected === "cod" ? styles.active : ""
        }`}
        onClick={() => setSelected("cod")}
      >
        <div className="d-flex align-items-center gap-3">

          <div className={styles.iconBox}>
            <Image
              src="/assets/svg/cod.svg"
              alt="COD"
              width={24}
              height={24}
            />
          </div>

          <div>
            <div className={`fw-semibold ${styles.mode}`}>Cash on Delivery (COD)</div>
            <small className={`text-muted ${styles.modeDes}`}>Standard payment on arrival</small>
          </div>

        </div>

        
        {selected === "cod" && (
          <div className={styles.tickCircle}>
            <Image
              src="/assets/svg/tick.svg"
              alt="selected"
              width={12}
              height={12}
            />
          </div>
        )}
      </div>

      
      <div className={`d-flex align-items-center rounded-4 p-3 mb-3 opacity-50 ${styles.option}`}>
        <div className="d-flex align-items-center gap-3">

          <div className={styles.iconBox}>
            <Image
              src="/assets/svg/cardPayment.svg"
              alt="Card"
              width={24}
              height={24}
            />
          </div>

          <div>
            <div className={`fw-semibold ${styles.mode}`}>
              Card Payments <span className={styles.badge}>SOON</span>
            </div>
            <small className={`text-muted ${styles.modeDes}`}>
              Secure gateway integration
            </small>
          </div>

        </div>
      </div>

      
      <div className={`d-flex align-items-center rounded-4 p-3 opacity-50 ${styles.option}`}>
        <div className="d-flex align-items-center gap-3">

          <div className={styles.iconBox}>
            <Image
              src="/assets/svg/upi.svg"
              alt="UPI"
              width={24}
              height={24}
            />
          </div>

          <div>
            <div className={`fw-semibold ${styles.mode}`}>
              UPI / Wallets <span className={styles.badge}>SOON</span>
            </div>
            <small className={`text-muted ${styles.modeDes}`}>
              Digital first checkout
            </small>
          </div>

        </div>
      </div>

      
      <div className="d-flex justify-content-between align-items-center mt-4">

        <button
          className={`btn btn-link text-secondary p-0 ${styles.backbtn}`}
          onClick={onBack}
        >
        Back
       </button>


        <button
          className={`btn btn-primary px-4 py-2 rounded-3 ${styles.confirmBtn}`}
          onClick={onConfirmOrder}
        >
          Confirm Order
        </button>

      </div>

    </div>
  );
};

export default PaymentOptions;