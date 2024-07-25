import type { Strapi } from '@strapi/strapi';
import * as jose from 'jose';
import pluginId from '../../admin/src/pluginId';
import buildPluginConfig from '../utils/buildPluginConfig';


export default ({ strapi }: { strapi: Strapi }) => ({
  getPluginConfig: async (ctx) => {
    try {
      const pluginConfig = await buildPluginConfig(strapi);
      ctx.body = pluginConfig;
    }
    catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  },

  updatePluginConfig : async (ctx) => {
    try {
      const { body } = ctx.request;

      // Sanitize input data first
      // validateConfig(body);

      const secret = strapi.plugin(pluginId).config("JWT_SECRET") as string | undefined | null;
      if (!secret) {
        ctx.status = 500;
        ctx.body = {
          error: 'JWT_SECRET not found in server config'
        };
        return;
      }
      const decodedSecret = jose.base64url.decode(secret);
      const payload = {
        githubToken: body.githubToken,
      }

      const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', "typ": "JWT" })
      .sign(decodedSecret);

      body.githubToken = jwt;
      
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
