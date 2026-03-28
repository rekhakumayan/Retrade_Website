'use client';

import styles from '../styles/customers.module.css';

const CustomerViewModal = ({ isOpen, onClose, customer }) => {

  if (!isOpen || !customer) return null;

  return (
    <div className={styles.modalBackdrop}>

      <div className={`container ${styles.modalContainer}`}>

        <div className={`card ${styles.modalCard}`}>

          {/* HEADER */}
          <div className={`card-header d-flex justify-content-between align-items-center ${styles.modalHeader}`}>
            <h5 className="fw-bold mb-0">
              Customer Details
            </h5>

            <button
              className="btn-close"
              onClick={onClose}
            />
          </div>


          {/* BODY */}
          <div className="card-body">

            {/* PROFILE */}
            <div className="row align-items-center g-3">

              <div className="col-auto">
                <div className={styles.avatar}>
                  {customer.name?.charAt(0)}
                </div>
              </div>

              <div className="col">

                <h5 className="fw-bold mb-1">
                  {customer.name}
                </h5>

                <p className="text-muted mb-1">
                  {customer.email}
                </p>

                <div className="d-flex gap-3 small text-muted">
                  <span>Registration</span>
                  <span>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>

              </div>

            </div>

            <hr className="my-4" />

            {/* ORDER HISTORY */}
            <h6 className="fw-bold mb-3">
              Order History
            </h6>

            <div className="table-responsive">

              <table className={`table ${styles.orderTable}`}>

                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {console.log('Orders Data:', customer.orders)}

                  {customer.orders?.map((order) => (

                    <tr key={order._id}>

                      <td className="fw-semibold text-primary">
                        {order.orderId}
                      </td>

                      <td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td>

                        <span
                          className={`badge ${order.status === 'Completed'
                            ? 'bg-success'
                            : order.status === 'In Progress'
                              ? 'bg-warning text-dark'
                              : 'bg-danger'
                            }`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td className="fw-semibold text-success">
                        ${order.priceDetails?.totalAmount}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* FOOTER */}
          <div className={`card-footer text-center ${styles.modalFooter}`}>
            <button
              className="btn btn-primary px-4"
              onClick={onClose}
            >
              Close
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CustomerViewModal;