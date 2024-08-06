import type { Strapi } from '@strapi/strapi';
import pluginId from '../../admin/src/pluginId';

export default ({ strapi }: { strapi: Strapi }) => ({
  history: async (ctx) => {
    const { id } = ctx.params;
    const response = await strapi.plugin(pluginId).service('githubActions').history(id);
    ctx.body = response.data;
  },
  trigger: async (ctx) => {
    const { id } = ctx.params;
    const response = await strapi.plugin(pluginId).service('githubActions').trigger(id);
    if (response.status === 422 && response.statusText == 'Unprocessable Entity') {
      return ctx.unprocessableEntity('Unprocessable Entity');
    }
    ctx.body = response.data;
  },
  triggerAll : async (ctx) => {
    const response = await strapi.plugin(pluginId).service('githubActions').triggerAll();
    ctx.body = response.data;
  },
  log: async (ctx) => {
    const { id } = ctx.params;
    const { jobId } = ctx.request.query;
    const logURL = await strapi.plugin(pluginId).service('githubActions').getLogs(jobId, id);
    ctx.body = logURL;
  },
});
