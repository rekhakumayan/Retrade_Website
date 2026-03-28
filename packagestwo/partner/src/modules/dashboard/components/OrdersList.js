"use client";

import { useState, useEffect } from "react";
import Table from "@/sharedComponents/Table/Table";
import styles from "@/modules/products/components/ProductList.module.css";
import orderstyles from "@/modules/orders/components/OrdersList.module.css"

export default function OrdersList({ recentOrders }) {
    const orderToShow = recentOrders || []
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    const columns = [
        {
            header: "ORDER ID",
            accessor: "orderId",
            render: (value) => (
                <div className={orderstyles.orderId}>{value}</div>
            ),
        },
        {
            header: "CUSTOMER",
            accessor: "customer",
            render: (value) => (
                <div className={orderstyles.customerName}>
                    {value || "Unknown Customer"}
                </div>
            ),
        },
        {
            header: "STATUS",
            accessor: "status",
            render: (value) => (
                <span className={`${orderstyles.statusBadge} ${orderstyles[value]}`}>
                    {value}
                </span>
            ),
        },

        {
            header: "TOTAL PAYOUT",
            accessor: "priceDetails",
            render: (value) => <div className={orderstyles.payoutAmount}>${value}</div>,
        },
    ];
    return (
        <div className={styles.orderTableContainer}>
            <div className={styles.tableWrapper}>
                <div className={orderstyles.orderTableContainer}>
                    <Table columns={columns} data={orderToShow || []} />
                </div>

            </div>
        </div>
    );
}