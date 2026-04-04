'use client';

import '@/styles/typography.css';
import SVG from 'react-inlinesvg';
import styles from '../styles/sales.module.css';
import SalesStatsCard from '../components/SalesStatsCard';
import SalesFilterBar from '../components/SalesFilterBar';
import SalesTable from '../components/SalesTable';
import { useDispatch, useSelector } from 'react-redux';
import { getPartners } from '@/modules/partners/partner.module';
import { getSalesTable } from '@/modules/sales/services/sales.module';
import { useState, useEffect } from 'react';
import Button from '@/sharedComponents/Button/Button';
import { useRouter } from 'next/navigation';
import useAdminGuard from '@/hooks/useAdminGuard';


const SalesPage = () => {

  useAdminGuard();


  const dispatch = useDispatch();
  const router = useRouter();

  const { items: partners } = useSelector((state) => state.partners);
  const { items: salesData, totalPages } = useSelector((state) => state.sales);
  const { token, user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const currentDate = new Date();

  const currentMonthName = currentDate.toLocaleString('default', {
    month: 'long',
  });

  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(
    `${currentMonthName} ${currentYear}`
  );

  /* ---------------- CALCULATIONS ---------------- */

  const totalSales = salesData.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  const totalCommission = salesData.reduce(
    (sum, item) => sum + (item.earnedCommission || 0),
    0
  );

  const getMonthYear = (monthString) => {
    const date = new Date(monthString);
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  };

  /* ---------------- EXPORT ---------------- */

  const handleExport = async () => {
    const { month, year } = getMonthYear(selectedMonth);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/vendors/sales/export?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${month}-${year}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  /* ---------------- AUTH CHECK ---------------- */

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [token, user, router]);

  /* ---------------- API CALL ---------------- */

  useEffect(() => {
    const { month, year } = getMonthYear(selectedMonth);

    dispatch(getPartners(1,1000));
    dispatch(getSalesTable({ month, year, page, limit:rowsPerPage }));

  }, [dispatch, selectedMonth, page, rowsPerPage]);

  /* ---------------- PAGINATION ---------------- */

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  /* ---------------- SCROLL ---------------- */

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  /* ---------------- TABLE DATA ---------------- */

  const salesTableData = salesData.map((sales) => {
  const partner = partners.find(
    (p) =>
      String(p._id) === String(sales.vendorId) ||
      String(p.id) === String(sales.vendorId)
  );

  return {
    vendorShop: partner?.businessName || 'Unknown Vendor',
    commissionRate: partner?.commissionRate || 0,
    status: partner?.status || 'inactive',
    totalSales: sales?.totalAmount || 0,
    orders: sales?.orders || 0,
    earnedCommission: sales?.earnedCommission || 0,
  };
});

  /* ---------------- FILTER ---------------- */

  const filteredSalesTableData = salesTableData.filter((item) => {

    const matchSearch =
      (item.vendorShop || '').toLowerCase().includes(search.toLowerCase());

    const matchVendor =
      selectedVendor === 'all' || item.vendorShop === selectedVendor;

    return matchSearch && matchVendor;

  });

  /* ---------------- CARDS ---------------- */

  const salesCards = [
    {
      title: 'Total Retrade Commission',
      value: `$${totalCommission}`,
      badge: 'Selected Month',
      icon: '/assets/image/svg/walletIcon.svg',
      variant: 'primary',
    },
    {
      title: 'Total Monthly Sales',
      value: `$${totalSales}`,
      icon: '/assets/image/svg/sales-cart-line.svg',
    },
    {
      title: 'Performance Month',
      value: selectedMonth,
      icon: '/assets/image/svg/perfomance-cart.svg',
    },
  ];

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentTableData = filteredSalesTableData.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  return (
    <div className={`container-fluid ${styles.wrapperStyle}`}>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className={styles.headline}>Sales & Commissions</h2>
          <p className="mb-0 text-muted fw-medium">
            Detailed revenue breakdown and vendor payouts
          </p>
        </div>

        <Button
          variant="secondary"
          iconPosition="left"
          icon={<SVG src="/assets/image/svg/export.svg" />}
          className="text-muted fw-bold"
          onClick={handleExport}
        >
          Export Report
        </Button>
      </div>

      {/* Cards */}
      <div className="row g-3 mx-0 mt-4">
        {salesCards.map((card, index) => (
          <SalesStatsCard key={index} {...card} />
        ))}
      </div>

      {/* Filters */}
      <SalesFilterBar
        search={search}
        setSearch={setSearch}
        setSelectedMonth={setSelectedMonth}
        partners={partners}
        selectedVendor={selectedVendor}
        setSelectedVendor={setSelectedVendor}
      />

      {/* Table */}
      <div id="sales-table">
        <SalesTable data={filteredSalesTableData} />
      </div>

      {/* Pagination UI */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">

  {/* Rows */}
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
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      ◀ Prev
    </button>

    {[...Array(totalPages || 1)].map((_, i) => {
      const pageNumber = i + 1;

      return (
        <button
          key={pageNumber}
          className={`btn btn-sm ${
            page === pageNumber ? 'btn-primary' : 'btn-light'
          }`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    })}

    <button
      className="btn btn-sm btn-light"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      Next ▶
    </button>

  </div>

</div>

    </div>
  );
};

export default SalesPage;