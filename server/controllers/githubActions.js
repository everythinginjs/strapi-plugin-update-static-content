const pluginId = require('../../utils/pluginId');

module.exports = {
  history: async (ctx) => {
    const response = await strapi.plugin(pluginId).service('githubActions').history();
    ctx.body = response.data;
  },
  trigger: async (ctx) => {
    const response = await strapi.plugin(pluginId).service('githubActions').trigger();
    if (response.status === 422 && response.statusText == 'Unprocessable Entity') {
      return ctx.unprocessableEntity('Unprocessable Entity');
    }
    ctx.body = response.data;
  },
};
