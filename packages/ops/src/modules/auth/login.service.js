import api from '@/services/api';

export const getLogin = async (data) => {
  return api.post('/v1/auth/login', data);
};