const Hapi = require('@hapi/hapi');
require('dotenv').config();

// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { cors, security, router } = require('./security/index');
const plugins = require('./plugins/index');
const Database = require('../config/databases/mongodb');
const isDev = process.env.NODE_ENV === 'development';

const serverConf = {
  port: process.env.API_PORT,
  host: process.env.API_HOST,
  router: router,
  routes: {
    security: security,
    cors: cors,
    validate: {
      failAction: async (request, h, err) => {
        request.server.log(
          ['validation', 'error'],
          'Joi throw validation error',
        );
        throw err;
      },
    },
  },
};

if (isDev) {
  serverConf.debug = { request: ['error'] };
}

const server = new Hapi.Server(serverConf);

async function init() {
  await server.register(plugins);
  await server.initialize();
  await Database.connectDB();
  global.logger = server.logger;
  return server;
}

async function start() {
  await server.start();
  return server;
}

async function stop() {
  await server.stop();
  return server;
}

process.on('uncaughtException', (err) => {
  server.logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  server.logger.error(
    {
      promise: promise,
      reason: reason,
    },
    'unhandledRejection',
  );
  process.exit(1);
});

module.exports = {
  init,
  start,
  stop,
};
