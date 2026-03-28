"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "@/modules/customers/customers.module";
import Table from "@/sharedComponents/Table/Table";
import Button from "@/sharedComponents/Button/Button";
import Modal from "@/sharedComponents/Modal/Modal";
import styles from "@/modules/products/components/ProductList.module.css";
import CustomerDetail from "@/modules/customers/components/CustomerDetail"
import customerstyles from "./CustomersList.module.css";

export default function CustomersList({ searchTerm, selectedDate }) {

    const dispatch = useDispatch();

    const { items: customers, loading } = useSelector((state) => state.customers);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(
            getCustomers({
                page,
                search: debouncedSearch,
                date: selectedDate
            })
        );
    }, [dispatch, page, debouncedSearch, selectedDate]);


    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timer);

    }, [searchTerm]);

    if (loading) {
        return <p>Loading customers...</p>;
    }

    const formattedCustomers = customers.map((customer) => ({
        ...customer,
        id: customer.customerId || "N/A",
        name: customer.name || "Unknown",
        email: customer.email || "N/A",
        orders: customer.orders || 0,
        spend: customer.grossSpend || 0,
        firstSeen: new Date(customer.firstSeen).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
    }));

    const paginatedCustomers = formattedCustomers;

    const columns = [
        {
            header: "CUSTOMER PROFILE",
            accessor: "customer",
            render: (_, row) => (
                <div className="d-flex gap-2">

                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.customer}`}
                        alt="avatar"
                        className={customerstyles.avatar}
                    />

                    <div className={customerstyles.profileText}>
                        <div className={customerstyles.customerName}>
                            {row.name}
                        </div>

                    </div>

                </div>
            ),
        },

        {
            header: "CONTACT DETAILS",
            accessor: "email",
            render: (value) => (
                <div className={customerstyles.contact}>
                    <i className="bi bi-envelope"></i>
                    {value}
                </div>
            )
        },

        {
            header: "ENGAGEMENT",
            accessor: "orders",
            render: (value) => (
                <span className={customerstyles.ordersBadge}>
                    {value} Orders
                </span>
            ),
        },

        {
            header: "GROSS SPEND",
            accessor: "spend",
            render: (value) => (
                <div>
                    <div className={customerstyles.spendAmount}>
                        {/* <i className={`bi bi-currency-dollar`}></i> */}
                        <span> {value} </span>
                    </div>
                </div>
            ),
        },
        {
            header: "FIRST SEEN",
            accessor: "firstSeen",
            render: (value) => (

                <div className={customerstyles.firstSeen}>
                    {value}

                </div>
            )

        }
    ];

    return (
        <div>
            <div className={styles.tableContainer}>

                <div className={styles.tableWrapper}>

                    <Table
                        columns={columns}
                        data={paginatedCustomers}
                        renderActions={(row) => (
                            <button onClick={() => {
                                setSelectedCustomer(row);
                                setIsModalOpen(true);
                            }} className={customerstyles.viewBtn}>
                                <i className="bi bi-eye text-dark fw-bold fs-6"></i>
                            </button>
                        )}
                    />

                    <div className={customerstyles.pagination}>

                        <Button
                            className={customerstyles.pageButton}
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Prev
                        </Button>

                        <span className={customerstyles.pageInfo}>
                            Page {page}
                        </span>

                        <Button
                            className={customerstyles.pageButton}
                            disabled={customers.length < limit}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>

                    </div>

                </div>

            </div>
            <Modal
                title="Customer Profile"
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                {selectedCustomer && <CustomerDetail customer={selectedCustomer} />}
            </Modal>
        </div>
    );
}