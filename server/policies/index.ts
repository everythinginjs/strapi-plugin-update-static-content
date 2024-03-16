import buildPluginConfig from '../utils/buildPluginConfig';
import { errors } from '@strapi/utils';

export default {
  validatePluginConfig: (_ctx, _cfg, { strapi }) => {
    const pluginConfig = buildPluginConfig(strapi);

    for (const key in pluginConfig) {
      let value = pluginConfig[key];
      if (!key || !value) {
        throw new errors.PolicyError('MISSING_CONFIG', {
          type: `${key.toLowerCase()}`,
        });
      }
    }

    return true;
  },
};
