'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/variables.css';
import '@/styles/typography.css';
import styles from '@/modules/ovdashboard/DashboardPage.module.css';
import SVG from 'react-inlinesvg';
import RevenueChart from '@/modules/ovdashboard/components/RevenueChart';
import StatCard from '@/modules/ovdashboard/components/StatCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDashboard } from '@/modules/ovdashboard/dashboard.module';
import { useRouter } from 'next/navigation';

// const revenueData = [
//   { name: 'JAN', value: 70 },
//   { name: 'FEB', value: 60 },
//   { name: 'MAR', value: 100 },
//   { name: 'APR', value: 20 },
// ];


const DashboardPage = () => {

  const dispatch = useDispatch();

  const { stats } = useSelector((state) => state.dashboard);
  const { token, user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [token, user, router]);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  // Revenue data from API
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const revenueData = months.map((month) => {
    const found = stats?.revenueChart?.find((item) => item.name === month);

    return {
      name: month,
      value: found ? Number(found.value) : 0,
    };
  });

  const statsCards = [
    {
      title: 'Live Vendors',
      value: stats?.activeVendors || 0,
      growth: '+2 this month',
      icon: '/assets/image/svg/live-vendor-card.svg',
      color: styles.indigo,
    },
    {
      title: 'Active Orders',
      value: stats?.activeOrders || 0,
      growth: '+12% growth',
      icon: '/assets/image/svg/active-orders-card.svg',
      color: styles.blue,
    },
    {
      title: 'Gross Volume',
      value: `$${stats?.grossVolume || 0}`,
      icon: '/assets/image/svg/gross-volume-card.svg',
      color: styles.green,
    },
    {
      title: 'Net Commission',
      value: `$${stats?.netCommission || 0}`,
      icon: '/assets/image/svg/net-commisions-card.svg',
      color: styles.amber,
    },
  ];

  return (
    <main className={`flex-grow-1 w-100 ${styles.dashboardMain}`}>

      {/* Header */}
      <div className="container-fluid">
        <div className="row justify-content-between align-items-end px-0">

          <div className="col">
            <h1 className={`fw-bold mb-0 ${styles.dashboardTitle}`}>
              Marketplace Insights
            </h1>
            <p className="text-muted fw-medium mt-1 mb-0">
              Real-time ecosystem performance monitoring
            </p>
          </div>

          <div className={`col-auto d-flex align-items-center ${styles.updateBox}`}>
            <span className="text-muted fw-bold text-xs lh-sm">
              Updates every 30s
            </span>
            <span className={styles.liveDot}></span>
          </div>

        </div>
      </div>

      {/* Stats Row */}
      <div className={`row g-4 ${styles.statsRow}`}>
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Revenue + Top Performers */}
      <div className={`row g-4 ${styles.revenueRow}`}>

        {/* Revenue Trend */}
        <div className="col-12 col-xl-8 d-flex">
          <div className={styles.revenueCard}>

            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h4 className="text-dark fw-bold d-flex align-items-center gap-2 mb-0">
                  <SVG src="/assets/image/svg/revenue-trend.svg" />
                  Marketplace Revenue Trend
                </h4>

                <p
                  className="text-xs fw-bold text-muted mt-1 mb-0"
                  style={{ letterSpacing: '1px' }}
                >
                  GROWTH FORECAST: +15%
                </p>
              </div>

              <select className={styles.selectBox}>
                <option>Last 6 Months</option>
                <option>Year to Date</option>
              </select>
            </div>

            <div className={styles.chartArea}>
              <RevenueChart data={revenueData} />
            </div>

          </div>
        </div>

        {/* Top Performers */}
        <div className="col-12 col-xl-4">
          <div className={styles.performerCard}>

            <div className="text-secondary d-flex align-items-center gap-2 mb-4">
              <SVG src="/assets/image/svg/top-performer.svg" />
              <h4 className="text-dark fw-bold mb-0">
                Top Performers
              </h4>
            </div>

            <div className={styles.performerItem}>
              <div className="d-flex align-items-center gap-3">
                <SVG
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  className={styles.avatar}
                />
                <div>
                  <p className="fw-bold mb-0">
                    {stats?.topPerformer?.vendorName || 'No Vendor'}
                  </p>
                  <small className="text-muted text-xs">12% TIER</small>
                </div>
              </div>

              <div className="text-end">
                <p className="fw-bold mb-0" style={{ color: '#10b981' }}>
                  ${stats?.topPerformer?.revenue || 0}
                </p>
              </div>
            </div>

            <button className={styles.rankBtn}>
              VIEW RANKING BOARD
            </button>

          </div>
        </div>

      </div>

    </main>
  );
};

export default DashboardPage;