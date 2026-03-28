import api from '@/services/api';

export const createPartner = async (data) => {
  return api.post('/v1/vendors', data);
};

export const getPartners = async () => {
  return api.get('/v1/vendors');
};

export const updateVendorStatus = async (id, status) => {
  return api.patch(`/v1/vendors/${id}/status`, { status });
};

export const updateVendorCommission = (id, commissionRate) => {
  return api.patch(`/v1/vendors/${id}/commission`, {
    commissionRate,
  });
};