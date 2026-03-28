const VendorController = require('../controllers/Vendor');
const { vendors } = require('../validation/vendor');

module.exports = {
  plugin: {
    async register(server) {
      const { isAdmin } = server.methods;

      server.route([

        {
          method: 'POST',
          path: '/',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            validate: {
              payload: vendors.save.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            pre: [{ method: isAdmin }],
            handler: VendorController.save,
            description: 'Onboard a new vendor onto the platform',
          },
        },

        {
          method: 'GET',
          path: '/',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.fetch,
            description: 'Fetch all vendors with optional pagination',
          },
        },

        {
          method: 'GET',
          path: '/sales',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.getSalesTable,
            description: 'Fetch vendors sales table data',
          },
        },

        {
          method: 'GET',
          path: '/sales/export',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.exportSalesReport,
            description: 'Export vendors sales report as CSV',
          },
        },

        {
          method: 'GET',
          path: '/customers',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.getCustomers,
            description: 'Fetch all customers',
          },
        },

        {
          method: 'GET',
          path: '/customers/stats',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.getCustomerStats,
            description: 'Fetch customers stats',
          },
        },

        {
          method: 'GET',
          path: '/customers/{id}',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.getCustomerById,
            description: 'Fetch customer details with orders',
          },
        },

        {
          method: 'PATCH',
          path: '/customers/{id}/status',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.updateCustomerStatus,
            description: 'Block or unblock a customer',
          },
        },

        {
          method: 'GET',
          path: '/{id}',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            validate: {
              params: vendors.fetchById.params,
            },
            // pre: [{ method: isAdmin }],
            handler: VendorController.fetchById,
            description: 'Fetch a single vendor by ID',
          },
        },


        {
          method: 'PATCH',
          path: '/{id}/commission',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            validate: {
              params: vendors.updateCommissionId.params,
              payload: vendors.updateCommission.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            pre: [{ method: isAdmin }],
            handler: VendorController.updateCommission,
            description: 'Update vendor commission rate via inline edit',
          },
        },


        {
          method: 'PATCH',
          path: '/{id}/status',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            validate: {
              params: vendors.updateStatusId.params,
              payload: vendors.updateStatus.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            pre: [{ method: isAdmin }],
            handler: VendorController.updateStatus,
            description: 'Toggle vendor status: active, inactive, or banned',
          },
        },

        {
          method: "GET",
          path: "/theme/{userId}",
          handler: VendorController.getVendorTheme,
        },

        {
          method: "PATCH",
          path: "/theme",
          options: {
            auth: "jwt",
          },
          handler: VendorController.updateVendorTheme,
        },
        
        {          
          method: 'GET',
          path: '/dashboard/count',
          options: {
            auth: 'jwt',
            tags: ['api', 'vendors'],
            pre: [{ method: isAdmin }],
            handler: VendorController.dashboardCount,
            description: 'Fetch all vendors with optional pagination',
          },
        },
        {
          method: 'GET',
          path: '/categories',
          options: {
            auth: "jwt",
            tags: ['api', 'Category'],
            validate: {},
            pre: [],
            handler: VendorController.getCategories,
            description: 'Get all categories',
          },
        },
        {
          method: "GET",
          path: "/products",
          options: {
            auth: "jwt",
            tags: ["api", "Product"],
            handler: VendorController.getProducts
          }
        },

      ]);
    },
    version: process.env.API_VERSION,
    name: 'vendors',
  },
};