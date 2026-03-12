"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles/CartItem.module.css";

const CartItem = ({ item, onDelete }) => {
  const [qty, setQty] = useState(item.qty || 1);

  return (
    <div className={styles.cartItem}>
      
      <div className={styles.imageCol}>
        <img
          src="/assets/avif/ddd.avif"
          alt={item.name}
          className={styles.image}
        />
      </div>
      
      
      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.desc}>{item.description}</p>

        <div className={styles.actions}>
          
          <div className={styles.qtyControl}>
            <button
              className={styles.qtyBtn}
              onClick={() => setQty(q => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              <Image
                src="/assets/svg/minus.svg"
                alt="-"
                width={12}
                height={12}
              />
            </button>

            <span className={styles.qtyValue}>{qty}</span>

            <button
              className={styles.qtyBtn}
              onClick={() => setQty(q => q + 1)}
              aria-label="Increase quantity"
            >
              <Image
                src="/assets/svg/plus.svg"
                alt="+"
                width={12}
                height={12}
              />
            </button>
          </div>

          
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(item.id)}
            aria-label="Remove item"
          >
            <Image
              src="/assets/svg/delete.svg"
              alt="Delete"
              width={14}
              height={14}
            />
          </button>
        </div>
      </div>

      
      <div className={styles.prices}>
        <p className={styles.price}>₹{item.price * qty}</p>
        <p className={styles.eachPrice}>₹{item.price} each</p>
      </div>
    </div>
  );
};

export default CartItem;