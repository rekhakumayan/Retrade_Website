import OrderCard from "../orders/OrderCard";
import EmptyOrders from "../orders/EmptyOrders";
import styles from "../styles/ProfileTabs.module.css";
import Button from "@/sharedComponents/Button/Button";
import Spinner from "@/sharedComponents/Loader/Spinner";

export default function OrdersTab({
  orders,
  loading,
  currentPage,
  totalPages,
  totalDocs,
  onPrev,
  onNext,
  onViewDetails,
}) {
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner></Spinner>
      </div>
    );
  }

  if (orders.length === 0) return <EmptyOrders />;

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      <div className="d-flex align-items-center justify-content-end gap-2 mt-auto pt-3">
        <span className={styles.paginationInfo}>
          {(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, totalDocs)}{" "}
          of {totalDocs}
        </span>

        <Button
          className={styles.paginationBtn}
          onClick={onPrev}
          disabled={currentPage <= 1 || loading}
        >
          ‹
        </Button>

        <Button
          className={styles.paginationBtn}
          onClick={onNext}
          disabled={currentPage >= totalPages || loading}
        >
          ›
        </Button>
      </div>
    </>
  );
}
