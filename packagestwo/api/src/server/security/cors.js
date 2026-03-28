let corsConfig = {
  origin: process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://ops.marketnest.com'],
  headers: [
    'Accept',
    'Authorization',
    'Content-Type',
    'Content-Disposition',
    'responseType',
    'x-session-id'
  ],
  additionalHeaders: [
    'x-session-id'
  ]
};

module.exports = corsConfig;
