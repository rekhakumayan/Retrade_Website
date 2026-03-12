'use client';

import { useEffect, useState } from 'react';
import AddPartnerModal from '@/modules/partners/components/AddPartnerModal';
import '@/modules/partners/partners.css';
import { getPartners, updatePartnerStatus, updatePartnerCommission, } from '@/modules/partners/partner.module';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import SVG from 'react-inlinesvg';
import Button from '@/sharedComponents/Button/Button';
import PartnerTable from './PartnerTable';


const PartnersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { items: partners, loading, error, updateLoadingId } = useSelector(
    (state) => state.partners
  );

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [token, user, router]);

  useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  const handleToggleStatus = async (partner) => {
    try {
      const newStatus =
        partner.status === 'active' ? 'disabled' : 'active';

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

        {/* ================= HEADER ================= */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">

          <div>
            <h1 className="partner-title mb-1">
              Vendor Partners
            </h1>
            <p className="fw-medium partner-subtitle mb-0">
              Onboard and manage platform sellers
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsOpen(true)}
            iconPosition='left'
            icon={
              <SVG
                src="/assets/image/svg/user-plus.svg"
                alt="add partner"
              />
            }
            children='Add New Vendor'
          />
           
        </div>

        {/* ================= LOADING / ERROR ================= */}
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

      </main>

      <AddPartnerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default PartnersPage;
