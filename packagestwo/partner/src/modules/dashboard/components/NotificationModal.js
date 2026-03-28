"use client";
import styles from "./NotificationModal.module.css"
import { useSelector } from "react-redux";

export default function NotificationDropdown({ markRead }) {
    const { loading, error,notifications } = useSelector((state) => state.dashboard);
    return (
        <div className="dropdown">
            {/* Bell Icon */}
            <button
                className="btn btn-light position-relative"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
            >
                <i className="bi bi-bell"></i>

                {/* Badge */}
                
            </button>

            {/* Dropdown */}
            <div
                className="dropdown-menu dropdown-menu-end p-0 shadow"
                style={{ width: "400px" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Notifications</h6>

                    {notifications.length > 0 && (
                        <button
                            className="btn btn-sm  text-primary p-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                markRead();
                            }}
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {loading ? (
                        <p className="p-3 text-muted">Loading...</p>
                    ) : error ? (
                        <p className="p-3 text-danger">{error}</p>
                    ) : notifications.length === 0 ? (
                        <p className="p-3 text-muted">No notifications</p>
                    ) : (
                        notifications.map((item) => (
                            <div
                                key={item._id}
                                className={`${styles.notificationItem} p-3 border-bottom d-flex justify-content-between align-items-start ${!item.isRead ? "bg-success bg-opacity-10" : ""
                                    }`}
                                
                                onClick={(e) => {
                                    e.stopPropagation();
                                    markRead(item._id);
                                }}

                            >
                                <div>
                                    <h3 className="mb-0">{item.title}</h3>
                                    <p className={`mb-0 ${styles.message} `}>{item.message}</p>
                                    <small className="text-primary">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </small>
                                </div>

                                {!item.isRead && (
                                    <span
                                        className={styles.greenDot}
                                    ></span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}