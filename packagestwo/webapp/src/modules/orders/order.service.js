import { apiRequest } from "@/lib/api";

const OrderService = {
  getByUser: (userId, page = 1) => apiRequest("GET", `/orders?userId=${userId}&page=${page}`),
  getById: (orderId) => apiRequest("GET", `/orders/${orderId}`),
};

export default OrderService;
