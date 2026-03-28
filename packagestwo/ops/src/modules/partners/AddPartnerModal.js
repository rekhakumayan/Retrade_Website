'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createPartner } from './partner.service';
import './add-partner-modal.css';

const initialFormState = {
    contactName: '',
    businessName: '',
    email: '',
    commissionRate: '',
};

const AddPartnerModal = ({ isOpen, onClose, onSuccess }) => {

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        Modal.setAppElement(document.body);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createPartner(formData);

            onSuccess();
            setFormData(initialFormState);
            onClose();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Email already exists');
            } else {
                alert('Something went wrong');
            }
        }
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
                        <button
                            type="button"
                            className="partner-btn-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="col-6 mt-4">
                        <button
                            type="submit"
                            className="partner-btn-save"
                        >
                            Save Partner
                        </button>
                    </div>

                </div>

            </form>

        </Modal>
    );
};

export default AddPartnerModal;
