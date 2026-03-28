'use client';

import { useEffect, useState } from 'react';
import AddPartnerModal from '@/modules/partners/components/AddPartnerModal';
import '@/modules/partners/partners.css';
import {getPartners,updatePartnerStatus,updatePartnerCommission,
} from '@/modules/partners/partner.module';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import Button from '@/sharedComponents/Button/Button';
import PartnerTable from './PartnerTable';
import useAdminGuard from '@/hooks/useAdminGuard';

const PartnersPage = () => {
  useAdminGuard()

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const {
    items: partners,
    loading,
    error,
    updateLoadingId,
    pagination,
  } = useSelector((state) => state.partners);

  const totalPages = pagination.totalPages;
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  // ✅ API only when token exists
  useEffect(() => {
    if (!token) return;

    dispatch(getPartners(page, limit));
  }, [dispatch, page, limit, token]);

  const handleToggleStatus = async (partner) => {
    try {
      const newStatus =
        partner.status === 'active' ? 'inactive' : 'active';

      await dispatch(
        updatePartnerStatus(partner._id, newStatus)
      );
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleEditClick = (partner) => {
    setEditingId(partner._id);
    setEditValue(Number(partner.commissionRate));
  };

  const handleCommissionSave = async (partner) => {
    try {
      await dispatch(
        updatePartnerCommission(partner._id, Number(editValue))
      );
      setEditingId(null);
    } catch (err) {
      console.error('Commission update failed:', err);
    }
  };

  return (
    <>
      <main className="flex-grow-1 main-35 w-100 page-content">

        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="partner-title mb-1">Partners</h1>
            <p className="fw-medium partner-subtitle mb-0">
              Onboard and manage platform sellers
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsOpen(true)}
            iconPosition="left"
            icon={
              <SVG
                src="/assets/image/svg/user-plus.svg"
                alt="add partner"
              />
            }
          >
            Add New Partner
          </Button>
        </div>

        {loading && <p className="mt-3">Loading vendors...</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <PartnerTable
          partners={partners}
          editingId={editingId}
          editValue={editValue}
          setEditValue={setEditValue}
          setEditingId={setEditingId}
          updateLoadingId={updateLoadingId}
          handleEditClick={handleEditClick}
          handleCommissionSave={handleCommissionSave}
          handleToggleStatus={handleToggleStatus}
        />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">

          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">Rows:</span>
            <select
              className="form-select form-select-sm"
              style={{ width: '80px' }}
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2 justify-content-center justify-content-md-end">

            <button
              className="btn btn-sm btn-light"
              disabled={!hasPrevPage}
              onClick={() => setPage(page - 1)}
            >
              ◀ Prev
            </button>

            {[...Array(totalPages || 1)].map((_, i) => {
              const pageNumber = i + 1;

              return (
                <button
                  key={pageNumber}
                  className={`btn btn-sm ${
                    page === pageNumber ? 'btn-primary' : 'btn-light'
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className="btn btn-sm btn-light"
              disabled={!hasNextPage}
              onClick={() => setPage(page + 1)}
            >
              Next ▶
            </button>

          </div>
        </div>
      </main>

      <AddPartnerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default PartnersPage;