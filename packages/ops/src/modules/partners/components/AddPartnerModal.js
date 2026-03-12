'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../add-partner-modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPartner, resetCreateState } from '@/modules/partners/partner.module';
import Button from '@/sharedComponents/Button/Button';

const initialFormState = {
  contactName: '',
  businessName: '',
  email: '',
  commissionRate: '',
};

const AddPartnerModal = ({ isOpen, onClose }) => {

  const dispatch = useDispatch();

  const { createLoading, createError, createSuccess } = useSelector(
    (state) => state.partners
  );

  const [formData, setFormData] = useState(initialFormState);

  // modal accessibility
  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);
  // success handling

  useEffect(() => {
    if (createSuccess) {
      setFormData(initialFormState);
      dispatch(resetCreateState());
      onClose();
    }
  }, [createSuccess, dispatch, onClose]);

  // Model reser (on reopen)

  useEffect(() => {
    if (isOpen) {
      dispatch(resetCreateState());
    }
  }, [isOpen, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addPartner(formData));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="partner-modal-box"
      overlayClassName="partner-modal-overlay"
      shouldCloseOnOverlayClick={true}
    >

      <h2 className="partner-modal-title">
        Onboard Partner
      </h2>

      {createError && (
        <div className="alert alert-danger mb-3">
          {createError}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="row g-3">

          <div className="col-6">
            <label className="partner-label">
              Contact Name
            </label>

            <input
              name="contactName"
              className="partner-input"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6">
            <label className="partner-label">
              Business Name
            </label>

            <input
              name="businessName"
              className="partner-input"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="partner-label">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              className="partner-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="partner-label">
              Comm. Rate (%)
            </label>

            <input
              type="number"
              name="commissionRate"
              className="partner-input"
              value={formData.commissionRate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6 mt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-100"
              children='cancel'
            />
          </div>

          <div className="col-6 mt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={createLoading}
              className="w-100"
              children={createLoading?'Saving....':'Save Partner'}     
                     />
              {/* {createLoading ? 'Saving...' : 'Save Partner'/} */}
          </div>

        </div>

      </form>

    </Modal>
  );
};

export default AddPartnerModal;
