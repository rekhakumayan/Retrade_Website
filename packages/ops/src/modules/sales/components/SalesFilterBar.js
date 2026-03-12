'use client';


import '@/styles/typography.css';
import '@/styles/variables.css';
import SVG from 'react-inlinesvg';
import styles from '../styles/sales.module.css';

const SalesFilterBar = () => {
  return (
    <div className={`row g-3 align-items-center mx-0 ${styles.filterBar}`}>

      {/* Search */}
      <div className="col-12 col-md">
        <div className="position-relative">
          <span className={`${styles.inputIcon}`}>
            <SVG src="/assets/image/svg/search.svg" />
          </span>

          <input
            type="text"
            placeholder="Search by shop or vendor name..."
            className={`${styles.searchInput}`}
          />
        </div>
      </div>

      {/* Month */}
      <div className="col-12 col-md-auto">
        <div className="position-relative">
          <span className={styles.inputIcon}>
            <SVG src="/assets/image/svg/calendar.svg" />
          </span>

          <input
            type="month"
            defaultValue="2026-03"
            className={`text-muted ${styles.filterInput}`}
          />
        </div>
      </div>

      {/* Vendor */}
      <div className="col-12 col-md-auto">
        <div className="position-relative">
          <span className={styles.inputIcon}>
            <SVG src="/assets/image/svg/filter.svg" />
          </span>

          <select className={`text-muted ${styles.filterInput}`}>
            <option>All Vendors</option>
            <option>Gadget World</option>
          </select>
        </div>
      </div>

    </div>

  );
};

export default SalesFilterBar;