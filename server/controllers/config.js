'use strict';

const buildPluginConfig = require('../utils/buildPluginConfig');

module.exports = {
  getPluginConfig: (ctx) => {
    ctx.body = buildPluginConfig(strapi, true);
  },
};
