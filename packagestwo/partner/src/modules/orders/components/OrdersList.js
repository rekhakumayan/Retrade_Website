"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/modules/orders/orders.module";
import Table from "@/sharedComponents/Table/Table";
import Button from "@/sharedComponents/Button/Button";
import styles from "@/modules/products/components/ProductList.module.css";
import orderstyles from "@/modules/orders/components/OrdersList.module.css"



export default function OrdersList({ searchTerm, statusFilter, selectedDate, onView }) {
    const dispatch = useDispatch();

    const { orders, loading, totalPages } = useSelector((state) => state.orders);
    const [page, setPage] = useState(1);

    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useEffect(() => {
        dispatch(
            fetchOrders({
                page,
                search: debouncedSearch,
                status: statusFilter,
                date: selectedDate ? selectedDate.toISOString() : null
            })
        );
    }, [dispatch, page, debouncedSearch, statusFilter, selectedDate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    if (loading) {
        return <p>Loading orders...</p>;
    }
    const formattedOrders = orders.map((order) => ({
        original:order,
        id: order.orderId,
        customer: order.userId?.name || "N/A",
        date: new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        status: order.status,
        payout:
            order.priceDetails?.totalAmount ||
            0
    }));

    const columns = [
        {
            header: "ORDER & CUSTOMER",
            accessor: "customer",
            render: (_, row) => (
                <div>
                    <div className={orderstyles.orderId}>
                        {row.id}
                    </div>
                    <div className={orderstyles.customerName}>{row.customer}</div>
                </div>
            ),
        },
        {
            header: "CREATION DATE",
            accessor: "date",
            render: (value) => (
                <span className={orderstyles.creationDate}>
                    {value}
                </span>
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
            header: "STORE PAYOUT",
            accessor: "payout",
            render: (value) => (
                <div>
                    <div className={orderstyles.payoutAmount} >
                        <span>{value}</span>
                    </div>
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
                    data={formattedOrders}
                    renderActions={(row) => (
                        <button 
                        className={orderstyles.viewBtn}
                        onClick={() => onView(row.original)}
                        >
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
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>

                </div>
            </div>
        </div>
    );
}