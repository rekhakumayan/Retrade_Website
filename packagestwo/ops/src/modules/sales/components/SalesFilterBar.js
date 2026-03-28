'use client';

import '@/styles/typography.css';
import '@/styles/variables.css';
import SVG from 'react-inlinesvg';
import styles from '../styles/sales.module.css';

const SalesFilterBar = ({
  search = '',
  setSearch,
  setSelectedMonth,
  partners = [],
  selectedVendor,
  setSelectedVendor
}) => {
    const now = new Date();
    const maxMonth = now.toISOString().slice(0, 7);

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
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
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
              defaultValue={maxMonth}   // 👈 dynamic current month
              max={maxMonth}            // 👈 future block
              className={`text-muted ${styles.filterInput}`}
              onChange={(e) => {
                const value = e.target.value;

                if (value > maxMonth) return; // extra safety

                const [year, month] = value.split('-');

                const monthName = new Date(year, month - 1).toLocaleString(
                  'default',
                  { month: 'long' }
                );

                setSelectedMonth(`${monthName} ${year}`);
              }}
            />
        </div>
      </div>

      {/* Vendor */}
      <div className="col-12 col-md-auto">
        <div className="position-relative">
          <span className={styles.inputIcon}>
            <SVG src="/assets/image/svg/filter.svg" />
          </span>

          <select
            className={`text-muted ${styles.filterInput}`}
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >

            <option value="all">All Vendors</option>

            {partners.map((vendor) => (
              <option key={vendor._id} value={vendor.businessName}>
                {vendor.businessName}
              </option>
            ))}

          </select>
        </div>
      </div>

    </div>
  );
};

export default SalesFilterBar;