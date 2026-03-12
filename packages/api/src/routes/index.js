// eslint-disable-next-line no-undef
const version = `/v${process.env.API_VERSION}`;
const routes = [
  {
    plugin: require('./health'),
    routes: {
      prefix: `${version}/health`,
    },
  },

  {
    plugin: require('./vendor'),
    routes: {
      prefix: `${version}/vendors`,
    },
  },

  {
    plugin: require('./user'),
    routes: {
      prefix: `${version}/auth`,
    },
  },
  {
    plugin: require('./category'),
    routes: {
      prefix: `${version}/categories`
    }
  },

  {
    plugin: require('./product'),
    routes: {
      prefix: `${version}/products`
    }
  },
  
   {
    plugin: require('./cart'),
    routes: {
      prefix: `${version}/cart`
    }
  },
 
   {
    plugin: require('./dashboard'),
    routes: {
      prefix: `${version}/dashboard`
    }
  },  

];

module.exports = routes;
