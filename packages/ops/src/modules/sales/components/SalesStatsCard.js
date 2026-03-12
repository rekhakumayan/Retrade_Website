'use client';

import SVG from 'react-inlinesvg';
import styles from '../styles/sales.module.css';

const SalesStatsCard = ({ title, value, badge, icon, variant, iconBg, iconColor,
}) => {
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className={`d-flex flex-column justify-content-between ${styles.card}`}>
        <div className="d-flex justify-content-between align-items-start">

          <div
            className={styles.iconBox}
            style={{ background: iconBg, color: iconColor }}
          >
            <SVG src={icon} />
          </div>

          {badge && (
            <p className={`text-muted fw-bold ${styles.badge}`}>
              {badge}
            </p>
          )}

        </div>

        <div className="mt-4">
          <span className="text-muted fw-bold mb-1">
            {title}
          </span>

          <h2 className="mb-0">
            {value}
          </h2>
        </div>

      </div>
    </div> 
    );
};

      export default SalesStatsCard;