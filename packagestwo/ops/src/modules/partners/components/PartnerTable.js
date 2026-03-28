'use client';

export default function PartnerTable({
  partners,
  editingId,
  editValue,
  setEditValue,
  setEditingId,
  updateLoadingId,
  handleEditClick,
  handleCommissionSave,
  handleToggleStatus
}) {
  return (
    <div className="partner-table-card">
      <div className="table-responsive">

        <table className="table partner-table align-middle mb-0">

          <thead>
            <tr>
              <th>Vendor Shop</th>
              <th>Contact Person</th>
              <th>Commission</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>

            {partners.map((partner) => (
              <tr key={partner._id}>

                {/* Vendor */}
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <div className="partner-avatar">
                      {partner.businessName?.charAt(0)}
                    </div>

                    <span className="partner-shop-name">
                      {partner.businessName}
                    </span>
                  </div>
                </td>

                {/* Contact */}
                <td>
                  <p className="mb-0 fw-semibold">
                    {partner.contactName}
                  </p>

                  <small className="text-muted">
                    {partner.email}
                  </small>
                </td>

                {/* Commission */}
                <td>

                  {editingId === partner._id ? (

                    <div className="d-flex align-items-center gap-2">

                      <input
                        type="number"
                        min="0"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="commission-inline-input"
                      />

                      <button
                        type="button"
                        className="commission-save-btn"
                        onClick={() => handleCommissionSave(partner)}
                        disabled={updateLoadingId === partner._id}
                      >
                        {updateLoadingId === partner._id
                          ? <span className="spinner-border spinner-border-sm"></span>
                          : '✓'}
                      </button>

                      <button
                        type="button"
                        className="commission-cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        ✕
                      </button>

                    </div>

                  ) : (

                    <div className="d-flex align-items-center gap-2">

                      <span className="commission-badge">
                        {partner.commissionRate}%
                      </span>

                      <button
                        type="button"
                        className="commission-edit-btn"
                        onClick={() => handleEditClick(partner)}
                      >
                        <img
                          src="/assets/image/svg/edit-commision.svg"
                          width="14"
                          height="14"
                        />
                      </button>

                    </div>

                  )}

                </td>

                {/* Status */}
                <td>
                  <span className={`partner-status ${partner.status}`}>
                    {partner.status}
                  </span>
                </td>

                {/* Joined */}
                <td className="text-muted small">
                  {new Date(partner.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="text-end">

                  <button
                    className={`partner-action-btn ${partner.status === 'active'
                      ? 'inactive'
                      : 'enable'
                      }`}
										onClick={() => {
											if (updateLoadingId === partner._id) return;
											handleToggleStatus(partner);
										}}                    
										disabled={updateLoadingId === partner._id}
                  >

                    {updateLoadingId === partner._id
                      ? <span className="spinner-border spinner-border-sm"></span>
                      : partner.status === 'active'
                        ? (
                          <img
                            src="/assets/image/svg/action-button-red.svg"
                            width="18"
                            height="18"
                          />
                        )
                        : (
                          <img
                            src="/assets/image/svg/action-button-green.svg"
                            width="18"
                            height="18"
                          />
                        )}

                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}