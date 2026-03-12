'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/typography.css';
import SVG from 'react-inlinesvg';
import styles from '../styles/sales.module.css';
import SalesStatsCard from '../components/SalesStatsCard';
import SalesFilterBar from '../components/SalesFilterBar';
import { useDispatch, useSelector } from 'react-redux';
import SalesTable from '../components/SalesTable';
import { getPartners } from '@/modules/partners/partner.module';
import { useState, useEffect } from 'react';
import Button from '@/sharedComponents/Button/Button';
import { getSalesDashboard } from '@/modules/sales/services/sales.service';
import { useRouter } from 'next/navigation';



const SalesPage = () => {

  const dispatch = useDispatch();
  const { items: partners } = useSelector((state) => state.partners);
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);
  const [dashboardData, setDashboardData] = useState({
    totalCommission: 0,
    totalSales: 0,
    month: ''
  });

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [token, user, router]);

  useEffect(() => {
    dispatch(getPartners());
    fetchDashboard();
  }, [dispatch]);

  const fetchDashboard = async () => {
    try {
      const res = await getSalesDashboard();

      setDashboardData({
        totalCommission: res.totalCommission || 0,
        totalSales: res.totalSales || 0,
        month: res.month || ''
      });

    } catch (error) {
      console.error('Sales dashboard error', error);
    }
  };

  const salesTableData = partners.map((partner) => ({
    vendorShop: partner.businessName,
    commissionRate: partner.commissionRate,
    status: partner.status,

    totalSales: '$0.00',
    orders: 0,
    earnedCommission: '$0.00',
  }));

  const salesCards = [
    {
      title: 'Total Marketplace Commission',
      value: `$${dashboardData.totalCommission}`,
      badge: 'Selected Month',
      icon: '/assets/image/svg/walletIcon.svg',
      variant: 'primary',
      iconBg: '#E8E8E8',
      iconColor: '#000000',
    },
    {
      title: 'Total Monthly Sales',
      value: `$${dashboardData.totalSales}`,
      icon: '/assets/image/svg/sales-cart-line.svg',
      iconBg: '#ecfdf5',
      iconColor: '#059669',
    },
    {
      title: 'Performance Month',
      value: dashboardData.month,
      icon: '/assets/image/svg/perfomance-cart.svg',
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
    },
  ];
  return (
    <div className={`container-fluid ${styles.wrapperStyle}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className={`${styles.headline}`}>Sales & Commissions</h2>
          <p className="mb-0 text-muted fw-medium">
            Detailed revenue breakdown and vendor payouts
          </p>
        </div>

        <Button
          variant="secondary"
          iconPosition="left"
          icon={
            <SVG src="/assets/image/svg/export.svg" />
          }
          className='text-muted fw-bold'
          children='Export Report'
        />

      </div>
      <div className="row gx-4 mx-0 mt-4">
        {salesCards.map((card, index) => (
          <SalesStatsCard key={index} {...card} />
        ))}
      </div>

      <SalesFilterBar />
      <SalesTable data={salesTableData} />

    </div>


  );
};

export default SalesPage;