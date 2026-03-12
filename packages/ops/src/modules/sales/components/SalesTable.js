'use client';

import styles from '../styles/sales.module.css';

const SalesTable = ({ data }) => {
  return (
    <div className={styles.salesTableCard}>
      <div className="table-responsive">

        <table className={`table ${styles.salesTable} align-middle mb-0`}>

          <thead>
            <tr>
              <th>Vendor Shop</th>
              <th>Commission Rate</th>
              <th>Total Sales</th>
              <th>Orders</th>
              <th>Earned Commission</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {data.map((row, index) => (
              <tr key={index}>

                {/* Vendor Shop */}
                <td className="text-center" >
                  <div className="text-center d-flex align-items-center gap-3">

                    <div className={styles.salesAvatar}>
                      {row.vendorShop?.charAt(0)}
                    </div>

                    <div>
                      <p className={`mb-0 ${styles.salesShopName}`}>
                        {row.vendorShop}
                      </p>

                      <small className="text-muted">
                        {row.email}
                      </small>
                    </div>

                  </div>
                </td>

                {/* Commission */}
                <td>
                  <span className={styles.salesCommissionBadge}>
                    {row.commissionRate}%
                  </span>
                </td>

                {/* Total Sales */}
                <td>
                  {row.totalSales}
                </td>

                {/* Orders */}
                <td>
                  {row.orders}
                </td>

                {/* Earned Commission */}
                <td className="fw-semibold text-primary">
                  {row.earnedCommission}
                </td>

                {/* Status */}
                <td className="text-end">

                  <span className={`${styles.salesStatus} ${styles[row.status]}`}>
                    {row.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default SalesTable;