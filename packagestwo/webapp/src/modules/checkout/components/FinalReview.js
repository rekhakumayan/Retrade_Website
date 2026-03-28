"use client";

import { useRouter } from "next/navigation";
import styles from "./styles/FinalReview.module.css";
import Image from "next/image";

const FinalReview = ({ onBack, totalPrice }) => {

  const router = useRouter();

  return (
    <div className={`card p-4 ${styles.card}`}>

      <h5 className={`fw-bold mb-3 ${styles.title}`}>
        Final Review
      </h5>

      
      <div className={`d-flex justify-content-between ${styles.reviewBox}`}>

        <div>
          <p className={styles.label}>DELIVER TO</p>
          <p className={styles.name}>Rahul Sharma</p>
          <p className={styles.address}>
            H-45, Green Park, New Delhi
          </p>
        </div>

        <div>
          <p className={styles.label}>METHOD</p>
          <p className={styles.method}>COD</p>
        </div>

      </div>

      
      <div className={styles.protectionBox}>

        <div className="d-flex align-items-start gap-2">

          <Image
            src="/assets/svg/protect.svg"
            alt="Buyer Protection"
            width={18}
            height={18}
          />

          <div>
            <p className={`mb-0 ${styles.enable}`}>
              Buyer Protection Enabled
            </p>

            <p className={styles.description}>
              Your purchase is secured. Our 7-day return policy applies to
              all electronic items in this order.
            </p>
          </div>

        </div>

      </div>

    
      <div className="d-flex justify-content-between align-items-center">

        <button
          className={styles.backBtn}
          onClick={onBack}
        >
          Back
        </button>

        <button 
          className={styles.placeOrderBtn}
          onClick={() => router.push("/order-confirm")}
          
        >
          Place Order ₹{totalPrice.toLocaleString("en-IN")}
        </button>

      </div>

    </div>
  );
};

export default FinalReview;