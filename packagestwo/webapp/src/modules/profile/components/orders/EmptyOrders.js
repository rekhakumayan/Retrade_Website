import styles from "../styles/ProfileTabs.module.css";
import BoxIcon from "@/app/assets/icons/BoxIcon";

export default function EmptyOrders() {
  return (
    <div
      className={`${styles.emptyOrder} d-flex flex-column align-items-center justify-content-center py-5`}
    >
      <div
        className={`${styles.emptyIcon} d-flex align-items-center justify-content-center`}
      >
        <BoxIcon />
      </div>
      <p className={`${styles.emptyText} fw-bold small`}>
        You haven't placed any orders yet.
      </p>
    </div>
  );
}
