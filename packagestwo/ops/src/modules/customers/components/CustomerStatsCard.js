'use client';

import SVG from 'react-inlinesvg';
import styles from '../styles/customers.module.css';

const CustomerStatsCard = ({
    title,
    value,
    badge,
    icon,
    iconBg,
    iconColor,
    variant,
}) => {
    return (
        <div className="col-12 col-md-6 col-xl-3">
            <div className={`${styles.statCard} ${styles[variant]}`}>

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

export default CustomerStatsCard;