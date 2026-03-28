import { apiRequest } from "@/lib/api";

const UserService = {
  // GET /v1/user/{userId} — user details + addresses
  getUser: (userId) => apiRequest("GET", `/user/${userId}`),

  // PATCH /v1/user/{userId} — name update
  updateName: (userId, name) =>
    apiRequest("PATCH", `/user/${userId}`, { name }),

  // PATCH /v1/user/{userId} — address add
  addAddress: (userId, payload) =>
    apiRequest("PATCH", `/user/${userId}`, {
      addressAction: { data: payload },
    }),

  // PATCH /v1/user/{userId} — address update
  updateAddress: (userId, addressId, payload) =>
    apiRequest("PATCH", `/user/${userId}`, {
      addressAction: { addressId, data: payload },
    }),

  // PATCH /v1/user/{userId} — address delete
  deleteAddress: (userId, addressId) =>
    apiRequest("PATCH", `/user/${userId}`, {
      addressAction: { addressId, delete: true },
    }),

  // PATCH /v1/user/{userId} — set default address
  setDefaultAddress: (userId, addressId) =>
    apiRequest("PATCH", `/user/${userId}`, {
      addressAction: { addressId, isDefault: true },
    }),
};

export default UserService;
