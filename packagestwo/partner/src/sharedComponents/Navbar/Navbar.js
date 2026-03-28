"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotifications,markRead } from "@/modules/dashboard/dashboard.module";
import NotificationModal from "@/modules/dashboard/components/NotificationModal"
import SVG from "react-inlinesvg";
import styles from "./Navbar.module.css";

export default function Navbar({ onMenuClick }) {
  const shop = useSelector((state) => state.shop);
  const { notifications, data } = useSelector((state) => state.dashboard)
  const unReadCount = notifications.filter(n => !n.isRead).length
  const dispatch = useDispatch()

  const handleMarkRead = async (id=null) => {
    await dispatch(markRead(id))
  }
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <header className={styles.navbar}>

      <div className={styles.left}>

        <button
          className="btn d-md-none me-2"
          onClick={onMenuClick}
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <SVG
              key={shop.logoLink}
              src={shop.logoLink || "/signicon.svg"}
              width={24}
              height={24}
            />
          </div>

          <div className={`d-none d-md-flex ${styles.brandText}`}>
            <h2>Gadget World</h2>
            <span>MERCHANT PANEL</span>
          </div>
        </div>

      </div>

      <div className={styles.right}>
        <div className="position-relative">
          <NotificationModal
            markRead={handleMarkRead}
          />

          <span
            className={`${styles.customBadge} bg-danger fw-semibold`}
          >
            {unReadCount}
          </span>

        </div>

        <div className={`d-none d-md-flex ${styles.userInfo}`}>
          <div className={styles.userName}>Alex Rivera</div>
          <div className={styles.userRole}>ACCOUNT MANAGED</div>
          <div className={styles.userRole}>{data.totalNotifications}</div>
        </div>

        <div
          className={styles.avatar}
          onClick={() => router.push("/profile")}
          style={{ cursor: "pointer" }}
        >
          {/* <img
            src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
            key={user?.avatar}  
            alt="User Avatar"
          /> */}
        </div>

      </div>

    </header>
  );
}