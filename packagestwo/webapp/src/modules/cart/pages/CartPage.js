"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "@/modules/cart/components/CartItem";
import OrderSummary from "@/modules/cart/components/OrderSummary";
import EmptyCart from "@/modules/cart/components/EmptyCart";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/modules/cart/cart.module";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { items = [], loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  
  const handleDelete = (id) => {
    dispatch(removeCartItem(id));
  };

  
  const handleQtyChange = (id, type) => {
    const item = items.find((i) => (i.cartItemId || i._id) === id);
    if (!item) return;

    let quantity = item.quantity ?? 1;

    if (type === "inc") {
      quantity += 1;
      dispatch(updateCartItem({ id, quantity }));
    }

    if (type === "dec") {
      if (quantity === 1) {
        dispatch(removeCartItem(id));
        return;
      }

      quantity -= 1;
      dispatch(updateCartItem({ id, quantity }));
    }
  };

  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!items.length) return <EmptyCart />;

  const subtotal = items.reduce((sum, item) => {
    return sum + (item.itemTotal || 0);
  }, 0);

  const itemCount = items.reduce(
    (count, item) => count + (item.quantity || 1),
    0,
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
          {items.map((item) => {
            const id = item.cartItemId || item._id;

            return (
              <CartItem
                key={id}
                item={item}
                onDelete={handleDelete}
                onQtyChange={handleQtyChange}
              />
            );
          })}
        </div>

        <div className={styles.summaryCol}>
          <OrderSummary
            subtotal={subtotal}
            gst={subtotal * 0.18}
            deliveryText="FREE"
            itemCount={itemCount}
            total={subtotal * 1.18}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;