// eslint-disable-next-line no-undef
const version = `/v${process.env.API_VERSION}`;
const routes = [
  {
    plugin: require("./health"),
    routes: {
      prefix: `${version}/health`,
    },
  },

  {
    plugin: require("./vendor"),
    routes: {
      prefix: `${version}/vendors`,
    },
  },
 
  {
    plugin: require("./user"),
    routes: {
      prefix: `${version}/user`,
    },
  },

   {
    plugin: require("./auth"),
    routes: {
      prefix: `${version}/auth`,
    },
  },
  {
    plugin: require("./category"),
    routes: {
      prefix: `${version}/categories`,
    },
  },

  {
    plugin: require("./product"),
    routes: {
      prefix: `${version}/products`,
    },
  },

  {
    plugin: require("./cart"),
    routes: {
      prefix: `${version}/cart`,
    },
  },


  {
    plugin: require("./orders"),
    routes: {
      prefix: `${version}/orders`
    }
  },

  {
    plugin: require('./Notification'),
    routes: {
      prefix: `${version}/notifications`
    }
  },
    
 
 
];

module.exports = routes;
