'use client';

import { useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '@/modules/auth/auth.module';
import SVG from 'react-inlinesvg';
import '@/styles/typography.css';
import '@/styles/variables.css';
import styles from './Sidebar.module.css';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = usePathname(); const menuItems = [
    {
      label: 'Overview Dashboard',
      path: '/dashboard',
      icon: 'assets/image/svg/layout-dashboard.svg',
    },
    {
      label: 'Partners Dashboard',
      path: '/partners',
      icon: 'assets/image/svg/users.svg',
    },

    {
      label: 'Customer Management',  
      path: '/customers',            
      icon: 'assets/image/svg/user-circle.svg',
    },
    {
      label: 'Sales & Commissions',
      path: '/sales',
      icon: 'assets/image/svg/sales-commission.svg',
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`
              ${styles.sidebar}
              ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}
              d-lg-block
            `}
      >
        <div className="container-fluid flex-grow-1">
          <div className="row flex-column h-100 ">

            <div className="d-flex justify-content-between align-items-center d-lg-none mb-3 px-1">
              <span className="fw-bold text-dark">Admin Menu</span>

              <button
                className="btn p-0"
                onClick={toggleSidebar}
              >
                <SVG src="assets/image/svg/close.svg" width="18" />
              </button>
            </div>

            {/* Top */}
            <nav className="col-12 p-0">

              <p
                className={`text-uppercase ${styles.sidebarHeading}`}
              >
                Core Management
              </p>

              <div className="d-flex flex-column gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      router.push(item.path);
                      toggleSidebar();
                    }}
                    className={`d-flex align-items-center gap-3 w-100 p-3 rounded-4 ${pathname === item.path ? styles.sidebarBtnActive : styles.sidebarBtn
                      }`}
                  >
                    <SVG src={item.icon} width="20" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Bottom */}
            <div className={`col-12 align-center px-0 ${styles.sidebarFooter}`}>
              <button
                onClick={handleLogout}
                className={`d-flex align-items-center gap-3 w-100 rounded-4 fw-bold ${styles.sidebarLogoutBtn}`}
              >
                <SVG src="assets/image/svg/logout.svg" width="20" />
                <span>Log Out System</span>
              </button>
            </div>

          </div>
        </div>
      </aside>

    </>
  );
};

export default Sidebar;