'use client';

import SVG from 'react-inlinesvg';
import styles from '../Page/DashboardPage.module.css';

const StatCard = ({ title, value, growth, icon, color }) => {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className={`${styles.statCard} p-lg-2 p-xl-4`}>
        <div className="d-flex align-items-start gap-3">

          <div className={`${styles.iconBox} ${color}`}>
            <SVG src={icon} />
          </div>

          <div>
            <p className="text-xs fw-medium text-muted mb-1">{title}</p>
            <h4 className="fw-bold mb-0 text-dark">{value}</h4>

            {growth && (
              <small className={`mt-1 ${styles.growthText}`}>
                {growth}
              </small>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatCard;