import styles from './Header.module.css';
import SVG from 'react-inlinesvg';

const Header = ({ toggleSidebar }) => {
  return (
    // <header className={`bg-white ${styles.header}`}>
    <header className="sticky-top header-blur">
      <div className={`container-fluid ${styles.header}`}>
        <div className={`row align-items-center h-100 g-0 ${styles.headerBar}`}>

          {/* LEFT COL - Logo */}
          <div className="col-2 d-flex align-items-center gap-3">

            {/* Mobile Toggle */}
            <button
              className="btn d-lg-none p-0"
              onClick={toggleSidebar}
            >
              <SVG src="/assets/image/svg/menu.svg" width="24" />
            </button>

            <div className={`d-flex align-items-center justify-content-center text-white flex-shrink-0 ${styles.logoBox}`}>
              <SVG
                src="assets/image/svg/header-shield-logo.svg"
                className={styles.logoIcon}
              />
            </div>

            <div className="d-flex flex-column">
              <span className="fw-bold fs-5 text-dark lh-1">Retrade</span>
              <span className={`text-uppercase fw-bold mt-1 ${styles.subtitle}`}>
                Admin Portal
              </span>
            </div>

          </div>

          {/* MIDDLE COL - Empty */}
          <div className="col-6" />

          {/* RIGHT COL - Status + Bell + Profile */}
          <div className="col-4 d-flex align-items-center justify-content-end gap-3">

            {/* System Status */}
            <div className={`d-none d-md-flex align-items-center gap-2 rounded-pill border bg-light flex-shrink-0 ${styles.statusBadge}`}>
              <span className={`rounded-circle flex-shrink-0 ${styles.statusDot}`} />
              <span className={`fw-bold text-secondary text-nowrap ${styles.statusText}`}>
                System Status: Optimal
              </span>
            </div>

            {/* Divider + Bell + Profile */}
            <div className="d-flex align-items-center gap-3 border-start ps-3 flex-shrink-0">

              {/* Bell */}
              <button className={`btn p-0 position-relative text-secondary ${styles.bellBtn}`}>
                <SVG
                  src="assets/image/svg/notification.svg"
                  className={styles.logoIcon}
                />
                <span className={`position-absolute ${styles.notificationDot}`} />
              </button>

              {/* User Info + Avatar */}
              <div className="d-flex align-items-center gap-2">
                <div className="text-end d-none d-sm-block">
                  <div className="fw-bold small text-dark text-nowrap">Super Admin</div>
                  <div className={`text-uppercase small text-muted text-nowrap fw-bold ${styles.roleText}`}>Super Admin</div>
                </div>
                <SVG
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                  className={`rounded-circle flex-shrink-0 ${styles.avatar}`}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;