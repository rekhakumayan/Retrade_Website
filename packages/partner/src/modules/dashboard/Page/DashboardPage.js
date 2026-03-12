'use client';

import { GoAlert } from "react-icons/go";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/modules/dashboard/dashboard.module";
import { useRouter } from "next/navigation";
import SVG from 'react-inlinesvg';

import RevenueChart from '@/modules/dashboard/components/RevenueChart';
import StatCard from '@/modules/dashboard/components/StatCard';
import Button from '@/sharedComponents/Button/Button';
import Header from "@/sharedComponents/Header/Header";
import OrdersList from "../components/Orders";

import styles from './DashboardPage.module.css';

const DashboardPage = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: dashboard, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  const statsCards = dashboard
    ? [
      {
        title: 'Gross Sales',
        value: `$${dashboard.grossSales}`,
        icon: '/gross-volume-card.svg',
        color: styles.indigo,
      },
      {
        title: 'Commission Deducted',
        value: `$${dashboard.commission}`,
        icon: '/downfall.svg',
        color: styles.red,
      },
      {
        title: 'Net Earnings',
        value: `$${dashboard.netEarnings}`,
        icon: '/revenue-trend.svg',
        color: styles.green,
      },
      {
        title: 'Total Products',
        value: dashboard.totalProducts,
        icon: '/box.svg',
        color: styles.amber,
      },
    ]
    : [];

  const revenueData = dashboard ? dashboard.revenue : [];

  return (
    <main className={`flex-grow-1 w-100 ${styles.dashboardMain}`}>

      {/* Header */}
      <Header
        title="Store Overview"
        subtitle="Track your earnings and inventory"
        rightContent={
          <Button
            onClick={() => router.push('/products')}
            className="w-100 w-md-auto text-nowrap"
          >
            <span className="fw-bold">Manage Inventory</span>
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="row g-4 mt-4">
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Revenue + Inventory */}
      <div className="row g-4 mt-4">

        {/* Revenue Chart */}
        <div className="col-12 col-xl-8 d-flex">
          <div className={styles.revenueCard}>

            <div className="d-flex justify-content-between align-items-start mb-4">
              <h4 className="text-dark fw-bold d-flex align-items-center gap-2 mb-0">
                <SVG src="/revenue-trend.svg" />
                Monthly Sales Performance
              </h4>
            </div>

            <div className={styles.chartArea}>
              <RevenueChart data={revenueData} />
            </div>

          </div>
        </div>

        {/* Inventory Alert */}
        <div className="col-12 col-xl-4">
          <div className={styles.performerCard}>

            <div className="text-secondary d-flex align-items-center gap-2 mb-4">
              <GoAlert className="fs-4 fw-semibold text-danger" />
              <h4 className="text-dark fw-bold mb-0">
                Inventory Alert
              </h4>
            </div>

            <div>
              {dashboard?.lowStockProducts?.length > 0 ? (
                dashboard.lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="d-flex justify-content-between py-1"
                  >
                    <div>{product.name}</div>
                    <div>
                      <span className="text-danger fs-6">
                        {product.stock} stock
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">
                  All products have sufficient stock
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className={`mt-5 ${styles.tableCard}`}>
        <OrdersList />
      </div>

    </main>
  );
};

export default DashboardPage;