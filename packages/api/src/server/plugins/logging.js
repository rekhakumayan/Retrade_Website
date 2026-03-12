const logging = {
  plugin: require('hapi-pino'),
  options: {
    ignorePaths:
      process.env.IGNORE_URLS_LOG.split(',').map((item) => item.trim()) || [],
    logPayload: process.env.LOG_PAYLOAD,
    logQueryParams: process.env.LOG_QUERY_PARAMS,
    logPathParams: process.env.LOG_PATH_PARAMS,
    log4xxResponseErrors: process.env.LOG_4XX_ERROR,
    logRequestStart: process.env.LOG_REQUEST_START,
    logRequestComplete: process.env.LOG_REQUEST_COMPLETE,
    ignoredEventTags: { log: [], request: [] }, // 'DEBUG', 'TEST'
    logEvents: [
      'response',
      'onPostStart',
      'onRequest',
      'log',
      'onPostStop',
      'request',
    ],
  },
};

module.exports = logging;
