'use client';

import '@/styles/typography.css';
import '@/styles/variables.css';
import SVG from 'react-inlinesvg';
import styles from '../styles/customers.module.css';

const CustomerFilterBar = ({
  search = '',
  setSearch,
  statusFilter,
  setStatusFilter,
  rowsPerPage = 10,
  setRowsPerPage
}) => {

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
            placeholder="Search by name or email..."
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            className={`${styles.searchInput}`}
          />

        </div>
      </div>

      {/* Status Filter */}
      <div className="col-12 col-md-auto">
        <div className="position-relative">

          <span className={styles.inputIcon}>
            <SVG src="/assets/image/svg/filter.svg" />
          </span>

          <select
            className={`text-muted ${styles.filterInput}`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Blocked</option>
          </select>

        </div>
      </div>

    </div>
  );
};

export default CustomerFilterBar;