"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateCartItem } from "@/modules/cart/cart.module";
import styles from "./styles/CartItem.module.css";

const CartItem = ({ item, onDelete }) => {
  const dispatch = useDispatch();

  const id = item.cartItemId || item._id;
  const product = item.product || {};
  const name = product.name || "Product";
  const desc = product.description || "No description";

  const image =
    product.images?.[0]?.url || product.image || "/assets/avif/ddd.avif";

  const qty = item.quantity ?? 1;
  const total = item.itemTotal || 0;
  const priceEach = qty ? total / qty : 0;


  // Increase quantity
  const increaseQty = () => {
    dispatch(
      updateCartItem({
        id: id,
        quantity: qty + 1,
      }),
    );
  };

  // Decrease quantity
  const decreaseQty = () => {
    if (qty === 1) {
      onDelete(id); 
      return;
    }

    dispatch(
      updateCartItem({
        id: id,
        quantity: qty - 1,
      }),
    );
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageCol}>
        <img 
          src={image} 
          alt={name} 
          className={styles.image} 
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{desc}</p>

        <div className={styles.actions}>
          <div className={styles.qtyControl}>
            <button className={styles.qtyBtn} onClick={decreaseQty}>
              <Image
                src="/assets/svg/minus.svg"
                alt="-"
                width={12}
                height={12}
              />
            </button>

            <span className={styles.qtyValue}>{qty}</span>

            <button className={styles.qtyBtn} onClick={increaseQty}>
              <Image
                src="/assets/svg/plus.svg"
                alt="+"
                width={12}
                height={12}
              />
            </button>
          </div>

          <button className={styles.deleteBtn} onClick={() => onDelete(id)}>
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
        <p className={styles.price}>₹{total}</p>
        <p className={styles.eachPrice}>₹{priceEach} each</p>
      </div>
    </div>
  );
};

export default CartItem;