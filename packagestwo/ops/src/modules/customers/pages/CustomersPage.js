'use client';

import '@/styles/typography.css';
import styles from '../styles/customers.module.css';
import CustomerStatsCard from '../components/CustomerStatsCard';
import CustomerFilterBar from '../components/CustomerFilterBar';
import CustomerTable from '../components/CustomerTable';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, getCustomerStats } from '../services/customers.module';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAdminGuard from '@/hooks/useAdminGuard';

const CustomersPage = () => {

  useAdminGuard();

  const dispatch = useDispatch();
  const router = useRouter();

  const { items: customers, totalPages, hasNextPage, hasPrevPage } =
    useSelector((state) => state.customers);

  const { stats } = useSelector((state) => state.customers);
  const { token, user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [token, user, router]);

  useEffect(() => {
    dispatch(getCustomers({ page, limit: rowsPerPage }));
    dispatch(getCustomerStats());
  }, [dispatch, page, rowsPerPage]);

  /* ---------------- SEARCH FILTER ---------------- */

  const filteredCustomers = customers.filter((item) => {

    const matchSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchSearch && matchStatus;

  });

  /* ---------------- CARDS ---------------- */

  const customerCards = [
    {
      title: 'Total Customers',
      value: stats?.totalCustomers || 0,
      icon: '/assets/image/svg/users.svg',
      variant: 'primary',
    },
    {
      title: 'Active Customers',
      value: stats?.activeCustomers || 0,
      icon: '/assets/image/svg/user-check.svg',
      variant: 'success',
    },
    {
      title: 'Blocked Customers',
      value: stats?.inactiveCustomers || 0,
      icon: '/assets/image/svg/user-x.svg',
      variant: 'danger',
    },
    {
      title: 'New This Month',
      value: stats?.newCustomersThisMonth || 0,
      icon: '/assets/image/svg/user-month.svg',
      variant: 'indigo',
    },
  ];

  return (
    <div className={`container-fluid ${styles.wrapperStyle}`}>

      {/* Header */}
      <div>
        <h2 className={`${styles.headline}`}>Customer Management</h2>
        <p className="mb-0 text-muted fw-medium">
          Monitor and manage platform customers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mx-0 mt-4">
        {customerCards.map((card, index) => (
          <CustomerStatsCard key={index} {...card} />
        ))}
      </div>

      {/* Filters */}
      <CustomerFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}

      />

      {/* Table */}
      <CustomerTable data={filteredCustomers} />

      {/* Pagination */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">

        {/* Rows per page */}
        <div className="d-flex align-items-center gap-2">

          <span className="text-muted small">Rows:</span>

          <select
            className="form-select form-select-sm w-auto"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

        </div>


        {/* Pagination */}
        <div className="d-flex align-items-center gap-2">

          <button
            className="btn btn-sm btn-light"
            disabled={!hasPrevPage}
            onClick={() => setPage(page - 1)}
          >
            ◀ Prev
          </button>


          {[...Array(totalPages || 1)].map((_, i) => {
            const pageNumber = i + 1;

            return (
              <button
                key={pageNumber}
                className={`btn btn-sm ${page === pageNumber ? 'btn-primary' : 'btn-light'
                  }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}


          <button
            className="btn btn-sm btn-light"
            disabled={!hasNextPage}
            onClick={() => setPage(page + 1)}
          >
            Next ▶
          </button>

        </div>

      </div>

    </div>
  );
};

export default CustomersPage;