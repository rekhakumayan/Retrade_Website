"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles/EmptyCart.module.css";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className={`${styles.emptyCartPage} container-fluid`}>
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          
          <div className={`${styles.emptyCartContent} text-center p-4`}>
            
            <div className={styles.emptyIcon}>
              <Image
                src="/assets/svg/cart.svg"
                alt="Empty cart"
                width={40}
                height={40}
                priority
              />
            </div>

            <h2 className={styles.emptyTitle}>Cart is empty</h2>

            <p className={styles.emptySubtitle}>
              Discover premium tech gear to fill it up.
            </p>

            <button
              className={`${styles.exploreBtn} mt-3`}
              onClick={() => router.push("/products")}
            >
              Explore Gadgets
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;