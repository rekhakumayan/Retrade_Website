'use strict';
const Pack = require('../../../package.json');

const url = new URL(process.env.API_BASE_URL);
const host = url.host;
// const scheme = url.protocol.replace(':', '');

const hapiSwagger = {
  plugin: require('hapi-swagger'),
  options: {
    schemes: ['https', 'http'],
    host,
    grouping: 'tags',
    expanded: 'none',
    tags: [],
    info: {
      title: 'API Documentation',
      version: Pack.version,
    },
    securityDefinitions: {
      AUTH0_TOKEN: {
        description: 'Auth0 jwt token use for api authentication',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
};

module.exports = hapiSwagger;
