const pluginId = require('../../utils/pluginId');

module.exports = {
  history: async (ctx) => {
    const response = await strapi.plugin(pluginId).service('githubActions').history();
    ctx.body = response.data;
  },
};
