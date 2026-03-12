let corsConfig = {
  origin: process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(',')
    : ['http://localhost:3000'],
  headers: [
    'Accept',
    'Authorization',
    'Content-Type',
    'Content-Disposition',
    'responseType',
  ],
};

module.exports = corsConfig;
