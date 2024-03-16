import type { Strapi } from '@strapi/strapi';
import buildPluginConfig from '../utils/buildPluginConfig';

export default ({ strapi }: { strapi: Strapi }) => ({
  getPluginConfig: (ctx) => {
    ctx.body = buildPluginConfig(strapi, true);
  },
});
