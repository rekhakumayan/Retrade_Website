"use client";

import { useState } from "react";
import Modal from "@/sharedComponents/Modal/Modal";
import OrderSummary from "../components/OrderSummary";
import styles from "./OrdersPage.module.css";
import OrdersToolbar from "../components/OrdersToolbar";
import OrdersList from "../components/OrdersList";
import OrdersStatusTabs from "../components/OrdersStatusTabs";

export default function OrdersPage() {

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleViewOrder = (order) => {
    setLoading(true);
    setIsOrderModalOpen(true);

    setTimeout(() => {
      setSelectedOrder(order);
      setLoading(false);
    }, 500);
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>

        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <h1 className="orderslogs">Order Logs</h1>
            <p>Track merchant fulfillment and logistics</p>
          </div>

          <div className={styles.headerRight}>
            <OrdersStatusTabs
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
        </div>

        <div className={styles.tableCard}>

          <OrdersToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <OrdersList
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            selectedDate={selectedDate}
            onView={handleViewOrder}
          />

        </div>

        <Modal
          title="Order Summary"
          open={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <OrderSummary order={selectedOrder} />
          )}
        </Modal>

      </div>

    </section>

  );
}