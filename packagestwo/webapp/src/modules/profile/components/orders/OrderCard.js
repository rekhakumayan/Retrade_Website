import styles from "../styles/ProfileTabs.module.css";
import { ClockIcon } from "@/app/assets/icons/index";

export default function OrderCard({ order, onViewDetails }) {
  return (
    <div className={`${styles.orderCard} p-3`}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
            <span className={styles.orderId}>#{order.orderId}</span>
            <span className={styles.orderStatus}>
              {order.status.toUpperCase()}
            </span>
          </div>
          <div
            className={`${styles.orderDate} d-flex align-items-center gap-1`}
          >
            <ClockIcon />
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="text-end">
          <p className={`${styles.orderPrice} mb-1`}>
            ₹{order.priceDetails?.totalAmount?.toLocaleString("en-IN")}
          </p>
          <button
            type="button"
            className={styles.orderDetailsBtn}
            onClick={() => onViewDetails(order.orderId)}
          >
            Order Details
          </button>
        </div>
      </div>
    </div>
  );
}
