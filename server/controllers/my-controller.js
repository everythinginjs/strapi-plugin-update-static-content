'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-update-static-content')
      .service('myService')
      .getWelcomeMessage();
  },
});
