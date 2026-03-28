const queryBuilder = {
  plugin: require('hapi-query-builder'),
  options: {
    defaultSelectField: 'all',
  },
};

module.exports = queryBuilder;
