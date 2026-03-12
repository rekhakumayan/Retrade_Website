"use client";
import { useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import styles from "./Navbar.module.css";

export default function Navbar({ onMenuClick }) {
  const shop = useSelector((state) => state.shop);
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
            <h2>Retrade</h2>
            <span>Partner Pannel</span>
          </div>
        </div>

      </div>

      <div className={styles.right}>

        <div className={`d-none d-md-flex ${styles.bellWrapper}`}>
          <i className="bi bi-bell"></i>
          <span className={styles.notificationDot}></span>
        </div>

        <div className={`d-none d-md-flex ${styles.userInfo}`}>
          <div className={styles.userName}>Alex Rivera</div>
          <div className={styles.userRole}>ACCOUNT MANAGED</div>
        </div>

        <div className={styles.avatar}>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            alt="User Avatar"
          />
        </div>

      </div>
    </header>
  );
}