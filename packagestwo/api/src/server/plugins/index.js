const logger = require('./logging');
const authentication = require('../middleware/authentication');
const queryPagination = require('../middleware/queryPagination');
const swagger = require('./swagger');

let plugins = [
  logger,
  authentication,
  swagger,
  {
    plugin: require('@hapi/inert'),
  },
  {
    plugin: require('@hapi/vision'),
  },

   {
    plugin: require('hapi-query-builder'),
  },
  queryPagination
];

/**
 * Register all routes in plugins
 * Simply add new routes in routes/index.js file for routing.
 */
const routes = require('../../routes/index');
const { plugin } = require('mongoose');
plugins = plugins.concat(routes);

module.exports = plugins;
