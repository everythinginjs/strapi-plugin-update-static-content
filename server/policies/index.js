'use strict';

const buildPluginConfig = require('../utils/buildPluginConfig');
const { PolicyError } = require('@strapi/utils').errors;

module.exports = {
  validatePluginConfig: (_ctx, _cfg, { strapi }) => {
    const pluginConfig = buildPluginConfig(strapi);

    for (const key in pluginConfig) {
      let value = pluginConfig[key];
      if (!key || !value) {
        throw new PolicyError('MISSING_CONFIG', {
          type: `${key.toLowerCase()}`,
        });
      }
    }

    return true;
  },
};
