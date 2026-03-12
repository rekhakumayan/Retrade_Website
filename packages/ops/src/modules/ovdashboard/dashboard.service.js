import api from '@/services/api';

export const getDashboardStats = async (token) => {
  return api.get('/v1/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};