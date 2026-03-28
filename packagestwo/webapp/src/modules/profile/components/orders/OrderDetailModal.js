"use client";
import { useState, useEffect } from "react";
import OrderService from "@/modules/orders/order.service";
import styles from "../styles/OrderDetail.module.css";
import CloseIcon from "@/app/assets/icons/CloseIcon";
import Spinner from "@/sharedComponents/Loader/Spinner";

export default function OrderDetailModal({ orderId, onClose }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await OrderService.getById(orderId);
        setOrder(res.data);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div
        className={`${styles.modal} d-flex align-items-center justify-content-center`}
      >
        <div className={styles.modalCard}>
          <div
            className={`${styles.modalHeader} d-flex align-items-center justify-content-between`}
          >
            <div className="d-flex align-items-center gap-2">
              {order && (
                <>
                  <p className={styles.orderId}>#{order.orderId}</p>
                  <span className={styles.orderStatus}>
                    {order.status.toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <button
              type="button"
              className={`${styles.closeBtn} d-flex align-items-center justify-content-center`}
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          {loading ? (
            <div
              className={`${styles.body} d-flex align-items-center justify-content-center`}
            >
              <Spinner></Spinner>
            </div>
          ) : !order ? (
            <div
              className={`${styles.body} d-flex align-items-center justify-content-center`}
            >
              <p className={styles.loadingText}>Order not found</p>
            </div>
          ) : (
            <div className={styles.body}>
              <div className={styles.section}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <p className={styles.sectionLabel}>Items</p>
                  <button type="button" className={styles.trackBtn}>
                    Track Order
                  </button>
                </div>
                <div className="d-flex flex-column">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className={`${styles.itemRow} d-flex align-items-center gap-3`}
                    >
                      {item.productId?.image ? (
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className={styles.productImage}
                        />
                      ) : (
                        <div className={styles.productImagePlaceholder} />
                      )}
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between">
                          <p className={`${styles.productName} pt-3`}>
                            {item.productId?.name}
                          </p>
                          <p className={`${styles.productPrice} pt-3`}>
                            ₹{item.price?.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <p className={styles.productQty}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order.address && (
                <div className={styles.section}>
                  <p className={styles.sectionLabel}>Deliver To</p>
                  <p className={styles.addressText}>
                    {order.address.houseNo} {order.address.street}{" "}
                    {order.address.city}, {order.address.pincode},{" "}
                    {order.address.country}
                  </p>
                </div>
              )}

              <div className={styles.section}>
                <p className={styles.sectionLabel}>Method</p>
                <p className={styles.methodText}>
                  {order.payment?.method?.toUpperCase()}
                </p>
              </div>

              <div className={styles.section}>
                <p className={styles.sectionLabel}>Price Details</p>
                <div
                  className={`${styles.priceRow} d-flex justify-content-between`}
                >
                  <span>Subtotal</span>
                  <span>
                    ₹{order.priceDetails?.price?.toLocaleString("en-IN")}
                  </span>
                </div>
                <div
                  className={`${styles.priceRow} d-flex justify-content-between`}
                >
                  <span>GST</span>
                  <span>
                    ₹{order.priceDetails?.gst?.toLocaleString("en-IN")}
                  </span>
                </div>
                <div
                  className={`${styles.priceRowTotal} d-flex justify-content-between`}
                >
                  <span>Total</span>
                  <span>
                    ₹{order.priceDetails?.totalAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
