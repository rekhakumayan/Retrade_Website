import api from '@/services/api';

/* GET CUSTOMERS LIST */

export const fetchCustomers = async (token) => {
  const response = await api.get('/v1/vendors/customers', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


/* GET CUSTOMER STATS */

export const fetchCustomerStats = async (token) => {
  const response = await api.get('/v1/vendors/customers/stats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


/* GET CUSTOMER DETAILS */

export const fetchCustomerById = async (id, token) => {
  const response = await api.get(`/v1/vendors/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


/* UPDATE CUSTOMER STATUS */

export const changeCustomerStatus = async (id, status, token) => {
  const response = await api.patch(
    `/v1/vendors/customers/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};