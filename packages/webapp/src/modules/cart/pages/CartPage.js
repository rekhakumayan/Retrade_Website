"use client";

import { useState } from "react";
import CartItem from "@/modules/cart/components/CartItem";
import OrderSummary from "@/modules/cart/components/OrderSummary";
import EmptyCart from "@/modules/cart/components/EmptyCart";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

const CartPage = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sony WH-1000XM5",
      description: "Industry-leading noise cancelling",
      price: 26991,
      qty: 1,
      image: "/ddd.avif",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      description: "Industry-leading noise cancelling",
      price: 26991,
      qty: 1,
      image: "/ddd.avif",
    },
  ]);

  const handleDelete = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className={`${styles.cartPage} container`}>

      <div className={styles.cartHeader}>
        <button
          className={styles.backArrowBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <Image 
            src="/assets/svg/arrow.svg" 
            alt="Back" 
            width={18} 
            height={18} 
            />
        </button>

        <h1 className={styles.cartTitle}>Your Cart</h1>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.itemsCol}>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <div className={styles.summaryCol}>
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;