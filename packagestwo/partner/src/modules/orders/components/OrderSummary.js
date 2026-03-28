"use client";

import styles from "./OrderSummary.module.css";
import Button from "@/sharedComponents/Button/Button";

export default function OrderSummary({ order }) {

    if (!order) return <p>No order selected</p>;

    return (
        <div className={styles.wrapper}>

            <h3 className={styles.title}>Order Summary  <p><strong>Order ID:</strong> {order.orderId}</p> </h3>

            {/* ORDER INFO */}
            <div className={styles.infoGrid}>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Customer</span>
                    <span className={styles.value}>{order.userId?.name}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Status</span>
                    <span className={styles.status}>{order.status}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Payment</span>
                    <span className={styles.value}>{order.payment?.method}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Created At</span>
                    <span className={styles.value}>
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                    </span>
                </div>

            </div>

            {/* ITEMS TABLE */}
            <div className={styles.section}>
                <h4>Items Ordered</h4>

                <div className={styles.tableHeader}>
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                </div>

                {order.items?.map((item, index) => (
                    <div key={index} className={styles.tableRow}>
                        <span>{item.productId?.name || "Product"}</span>
                        <span>{item.quantity}</span>
                        <span>{item.price}</span>
                    </div>
                ))}
            </div>

            {/* PRICE BREAKDOWN */}
            <div className={styles.section}>
                <h4>Price Breakdown</h4>

                <div className={styles.priceRow}>
                    <span>Price</span>
                    <span>{order.priceDetails?.price}</span>
                </div>

                <div className={styles.priceRow}>
                    <span>GST</span>
                    <span>{order.priceDetails?.gst}</span>
                </div>

                <div className={styles.priceRow}>
                    <span>Coupon</span>
                    <span>-{order.priceDetails?.coupon}</span>
                </div>

                <div className={styles.priceRow}>
                    <span>Delivery Charges</span>
                    <span>{order.priceDetails?.deliveryCharges}</span>
                </div>

                <div className={styles.priceRow}>
                    <span>Extra Charges</span>
                    <span>{order.priceDetails?.extraCharges}</span>
                </div>

                <div className={styles.totalRow}>
                    <span>Total</span>
                    <span>{order.priceDetails?.totalAmount}</span>
                </div>
            </div>

            {/* PRINT BUTTON */}
            <div className={styles.actions}>
                <Button onClick={() => window.print()}>
                    Print Order
                </Button>
            </div>

        </div>
    );
}