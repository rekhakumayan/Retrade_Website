"use client";

import { useRouter } from "next/navigation";
import styles from "./styles/OrderConfirm.module.css";
import Image from "next/image";

const OrderConfirm = ({ cartItems = [], totalPrice = 40000 }) => {
  const router = useRouter();

  const gst = Math.round(totalPrice * 0.12);

  return (
    <div className={`container py-5 ${styles.wrapper}`}>
      <div className={`card ${styles.card}`}>
        <div className="row g-0">

          <div className={`col-lg-4 ${styles.leftPanel}`}>
            <div className={styles.leftContent}>

              <div className={styles.checkIcon}>✓</div>

              <h4 className={styles.confirmTitle}>
                Order Confirmed!
              </h4>

              <p className={styles.confirmText}>
                Your premium tech is on its way.
              </p>

              <button
                className={styles.printBtn}
                onClick={() => window.print()}
              >
                Print Receipt
              </button>

            </div>
          </div>

          
          <div className={`col-lg-8 ${styles.rightPanel}`}>

            <div className={styles.header}>
              <div>
                <p className={styles.label}>RECEIPT NUMBER</p>
                <p className={styles.value}>#ORD-80706</p>
              </div>

              <div>
                <p className={styles.label}>TRANSACTION DATE</p>
                <p className={styles.value}>
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

           <div className="d-flex align-items-center gap-2 mb-2">
             <Image
                src="/assets/svg/shipping.svg"
                alt="Shipping"
                width={18}
                height={18}
             />

             <span className={styles.sectionTitle}>
               Shipping & Delivery
             </span>
             
            </div>
            
            <div className={styles.shippingBox}>
              <p className={styles.name}>Rahul Sharma</p>
              <p className={styles.address}>
                H-45, Green Park, New Delhi - 110016
              </p>

              <p className={styles.delivery}>
                • STANDARD DELIVERY: 3–5 WORKING DAYS
              </p>
            </div>

            
            <div className={styles.breakdown}>
              <p className={styles.sectionTitle}>Order Breakdown</p>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={styles.row}
                >
                  <span>
                    {item.quantity} × {item.name}
                  </span>

                  <span>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}

              <div className={styles.row}>
                <span>GST (12%)</span>
                <span>₹{gst.toLocaleString("en-IN")}</span>
              </div>
            </div>

            
            <div className={styles.totalRow}>
              <span className={styles.final}>FINAL TOTAL</span>

              <span className={styles.totalPrice}>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>


            
            <div className={`row ${styles.buttons}`}>

              <div className="col-6">
                 <button
                    className={`w-100 ${styles.primaryBtn}`}
                    onClick={() => router.push("/products")}
                 >
                  Browse Store →
                  </button>
               </div>

             <div className="col-6">
              <button
                  className={`w-100 ${styles.secondaryBtn}`}
                  onClick={() => router.push("/orders")}
              >
               Order History
             </button>
             </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;