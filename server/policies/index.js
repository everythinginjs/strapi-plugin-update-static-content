'use strict';

const buildPluginConfig = require('../utils/buildPluginConfig');
const FALLBACK_ROLES_VALUES = require('../utils/fallbackRoles');
const getPluginConfig = require('../utils/getPluginConfig');
const { PolicyError } = require('@strapi/utils').errors;

module.exports = {
  checkConfigRoles: (ctx, ø, { strapi }) => {
    let hasPermission = false;
    const configRoles = getPluginConfig(strapi)('roles', FALLBACK_ROLES_VALUES);
    const adminRoles = ctx.state.user.roles;

    for (let adminRole of adminRoles) {
      hasPermission = configRoles.some((configRole) => {
        return configRole == adminRole.code;
      });
    }

    if (!hasPermission) {
      throw new PolicyError('ACCESS_DENIED', { type: 'ROLES_AND_PERMISSIONS' });
    }

    return hasPermission;
  },
  validatePluginConfig: (ø1, ø2, { strapi }) => {
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
