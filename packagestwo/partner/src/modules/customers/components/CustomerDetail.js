import React from "react";
import styles from "@/modules/customers/components/CustomerDetail.module.css"
const CustomerDetail = ({ customer }) => {
    if (!customer) return null;

    const getStatusColor = (status) => {
        if (status === "delivered") return "bg-success";
        if (status === "pending") return "bg-warning text-dark";
        if (status === "cancelled") return "bg-danger";
        return "bg-secondary";
    };

    return (
        <div className="container-fluid">

            {/* Header */}

            <div className="modal-body">

                <div className="row g-3 mb-4 ">
                    <h6 className="text-muted ">Customer Information</h6>

                    <div className="col-md-6">
                        <div className="p-3 bg-light rounded">
                            <small className="text-muted">Name</small>
                            <div className="fw-semibold">{customer.name}</div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="p-3 bg-light rounded">
                            <small className="text-muted">Email</small>
                            <div className="fw-semibold">{customer.email}</div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="p-3 bg-light rounded">
                            <small className="text-muted">Phone</small>
                            <div className="fw-semibold">
                                {customer.phone || "N/A"}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="p-3 bg-light rounded">
                            <small className="text-muted">Registered On</small>
                            <div className="fw-semibold">
                                {new Date(customer.registrationDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Order Summary Cards */}
                <div className="row g-3 mb-5">

                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm bg-light">
                            <div className="card-body ">
                                <small className="text-muted">Total Orders</small>
                                <h4 className="fw-bold text-primary mt-1">
                                    {customer.orders}
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm bg-light">
                            <div className="card-body ">
                                <small className="text-muted">Total Spend</small>
                                <h4 className="fw-bold text-success mt-1">
                                    ₹{customer.spend}
                                </h4>
                            </div>
                        </div>
                    </div>

                </div>

                <h6 className="text-muted mt-7 mb-4">Order History</h6>

                <div className={styles.orderListScroll}>
                    <div className="table-responsive">
                        <table className="table align-middle table-hover">

                            <thead className="table-light">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customer.ordersList?.map((order) => (
                                    <tr key={order.orderId}>

                                        <td className="fw-semibold text-secondary">
                                            <span className={styles.orderDetails}>{order.orderId}</span>
                                        </td>

                                        <td className="text-muted">
                                            <span className={styles.orderDetails}>{new Date(order.date).toLocaleDateString()}</span>
                                        </td>

                                        <td>
                                            <span className={`badge ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        <td className="fw-semibold">
                                            <span className={styles.orderDetails}>₹{order.totalAmount}</span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CustomerDetail;