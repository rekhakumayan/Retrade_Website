"use client";

import { useState, useEffect } from "react";
import Table from "@/sharedComponents/Table/Table";
import Button from "@/sharedComponents/Button/Button";
import styles from "@/modules/products/components/ProductList.module.css";
import orderstyles from "@/modules/orders/components/OrdersList.module.css"



export default function OrdersList({ searchTerm, statusFilter, selectedDate }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 5;


    useEffect(() => {

        const fetchOrders = async () => {
            try {

                setLoading(true); orders, loading

                const res = await fetch(
                    "https://dummyjson.com/c/755a-5ecc-4580-8b41"
                );

                const data = await res.json();
                console.log("Orders API response:", data);

                let filteredOrders = data.data ||data.users || [];

                if (statusFilter !== "all") {
                    filteredOrders = filteredOrders.filter(
                        (order) => order.status === statusFilter
                    );
                }

                if (searchTerm) {
                    filteredOrders = filteredOrders.filter((order) =>
                        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order.id.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                if (selectedDate) {

                    filteredOrders = filteredOrders.filter((order) => {

                        const orderDate = new Date(order.date);

                        return (
                            orderDate.getMonth() === selectedDate.getMonth() &&
                            orderDate.getFullYear() === selectedDate.getFullYear()
                        );

                    });

                }

                const start = (page - 1) * limit;
                const paginatedOrders = filteredOrders.slice(start, start + limit);

                setOrders(paginatedOrders);

            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }

        };

        fetchOrders();

    }, [searchTerm, statusFilter, selectedDate, page]);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    const columns = [
        {
            header: "ORDER & CUSTOMER",
            accessor: "customer",
            render: (_, row) => (
                <div>
                    <div className={orderstyles.orderId}>
                        {row.id}
                    </div>
                    <div className={orderstyles.cutomerName}>{row.customer}</div>
                </div>
            ),
        },
        {
            header: "CREATION DATE",
            accessor: "date",
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
            header: "STORE PAYOUT",
            accessor: "payout",
            render: (value) => (
                <div>
                    <div className={orderstyles.payoutAmount} >{value}</div>
                    <div className={orderstyles.payoutNote}>
                        AFTER FEES
                    </div>
                </div>
            ),
        },
    ];




    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <Table
                    columns={columns}
                    data={orders}
                    renderActions={(row) => (
                        <button className={orderstyles.viewBtn}>
                            <i className="bi bi-eye"></i>
                        </button>
                    )}
                />

                <div className={orderstyles.pagination}>

                    <Button
                        className={orderstyles.pageButton}
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </Button>

                    <span className={orderstyles.pageInfo}>
                        Page {page}
                    </span>

                    <Button
                        className={orderstyles.pageButton}
                        disabled={orders.length < limit}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>

                </div>
            </div>
        </div>
    );
}