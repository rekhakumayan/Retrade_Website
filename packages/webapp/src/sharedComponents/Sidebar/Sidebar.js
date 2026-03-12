"use client";

import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>

        <p className={styles.sectionTitle}>
          CORE MANAGEMENT
        </p>

        {/* Overview */}
        <button className={styles.menuItem}>
          <span className={styles.icon}></span>
          <span>Overview Dashboard</span>
        </button>

        {/* Active */}
        <button className={`${styles.menuItem} ${styles.active}`}>
          <span className={styles.icon}></span>
          <span>Vendor Partners</span>
        </button>

        {/* Sales */}
        <button className={styles.menuItem}>
          <span className={styles.icon}></span>
          <span>Sales & Commissions</span>
        </button>

        <div className={styles.divider}></div>

        {/* Logout */}
        <button className={`${styles.menuItem} ${styles.logout}`}>
          <span className={styles.icon}></span>
          <span>Log Out System</span>
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar;