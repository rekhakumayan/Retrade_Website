const security = require('./security');
const cors = require('./cors');
const config = {
  security: security,
  cors: cors,
};

module.exports = config;
