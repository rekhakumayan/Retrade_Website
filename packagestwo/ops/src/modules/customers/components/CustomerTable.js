'use client';

import styles from '../styles/customers.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomerViewModal from './CustomerViewModal';
import { getCustomerById, updateCustomerStatus } from '../services/customers.module';
import SVG from 'react-inlinesvg';

const CustomerTable = ({ data = [] }) => {

  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleView = async (customerId) => {

    const res = await dispatch(getCustomerById(customerId));
    console.log("API FULL RESPONSE:", res);

    if (res?.data) {
      setSelectedCustomer({
        ...res.data.customer,
        orders: res.data.orders
      });

      setModalOpen(true);
      setOpenDropdown(null);
    }
  };

  const handleStatusChange = async (id, status) => {
    await dispatch(updateCustomerStatus(id, status));
    setOpenDropdown(null);
  };

  return (
    <>
      <div className={styles.salesTableCard}>
        <div className="table-responsive">

          <table className={`table ${styles.salesTable} align-middle mb-0`}>

            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>

              {data.map((row, index) => (
                <tr key={row._id}>

                  {/* Customer */}
                  <td>
                    <div className="d-flex align-items-center gap-3">

                      <div className={styles.salesAvatar}>
                        {row.name?.charAt(0)}
                      </div>

                      <p className={`mb-0 ${styles.salesShopName}`}>
                        {row.name}
                      </p>

                    </div>
                  </td>

                  {/* Email */}
                  <td>{row.email}</td>

                  {/* Registration */}
                  <td>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`${styles.salesStatus} ${styles[row.status]}`}>
                      {row.status === 'active' ? 'Active' : 'Blocked'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-end">

                    <div className="position-relative d-inline-block dropup">

                      <button
                        className="btn btn-sm btn-light"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === row._id ? null : row._id
                          )
                        }
                      >
                        <SVG
                          src="/assets/image/svg/more-vertical.svg"
                          width={16}
                          height={16}
                        />
                      </button>

                      {openDropdown === row._id && (
                        <ul
                          className="dropdown-menu show dropdown-menu-end"
                          style={{
                            position: 'absolute',
                            bottom: '110%',
                            right: 0,
                            zIndex: 1050
                          }}
                        >

                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleView(row._id)}
                            >
                              View
                            </button>
                          </li>

                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                handleStatusChange(
                                  row._id,
                                  row.status === 'active' ? 'inactive' : 'active'
                                )
                              }
                            >
                              {row.status === 'active' ? 'Block' : 'Unblock'}
                            </button>
                          </li>

                        </ul>
                      )}

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

      <CustomerViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        customer={selectedCustomer}
      />
    </>
  );
};

export default CustomerTable;