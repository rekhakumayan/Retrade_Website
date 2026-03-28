import api from '@/services/api';

export const getSalesTable = async (token) => {
  const response = await api.get('/v1/vendors/sales', { 
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};