import api from '@/services/api';

export const getSalesDashboard = async () => {
  const response = await api.get('/sales/dashboard');
  return response.data;
};