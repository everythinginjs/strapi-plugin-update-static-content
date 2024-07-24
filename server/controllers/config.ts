import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  getPluginConfig: async (ctx) => {
    try {
      const config = await strapi.entityService?.findOne('plugin::update-static-content.config', 1);
      console.log(config);
      ctx.body = config;
    }
    catch (err) {
      ctx.body = err;
    }
    // ctx.body = buildPluginConfig(strapi, true);
  },

  updatePluginConfig : async (ctx) => {
    try {
      const { body } = ctx.request;
      // console.log(data);

      // Sanitize input data first
      // validateConfig(body);
      const data = await strapi.entityService?.update('plugin::update-static-content.config', 1, {
        data: body
      });
      // If data is null, need to create a new entry
      if (!data) {
        ctx.body = await strapi.entityService?.create('plugin::update-static-content.config', {
          data: body
        });
      }
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
});
