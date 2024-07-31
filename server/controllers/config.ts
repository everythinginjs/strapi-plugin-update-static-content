import type { Strapi } from '@strapi/strapi';
import * as jose from 'jose';
import pluginId from '../../admin/src/pluginId';
import {queryPluginConfig, queryPluginConfigId} from '../utils/queryPluginConfig';
import {validateConfig} from '../validators/validateConfig';
import Config from '../../types/Config';


export default ({ strapi }: { strapi: Strapi }) => ({
  getPluginConfig: async (ctx) => {
    try {
      const pluginConfig = await queryPluginConfig(strapi) as Config[];
      ctx.body = pluginConfig.map((c) => {
        return {
          id: c.id,
          githubToken: c.githubToken.replace(/./g, '*'),
          githubAccount: c.githubAccount,
          repo: c.repo,
          workflow: c.workflow,
          branch: c.branch,
        }});
    }
    catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  },

  getPluginConfigById: async (ctx) => {
    try {
      const { id } = ctx.params;
      const pluginConfig = await queryPluginConfigId(strapi, id) as Config;
      ctx.body = {
        id: pluginConfig.id,
        githubToken: pluginConfig.githubToken.replace(/./g, '*'),
        githubAccount: pluginConfig.githubAccount,
        repo: pluginConfig.repo,
        workflow: pluginConfig.workflow,
        branch: pluginConfig.branch,
      };
    }
    catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  },
  
  deletePluginConfigById : async (ctx) => {
    try {
      const { id } = ctx.params;
      await strapi.entityService?.delete(`plugin::${pluginId}.config`, id);
      ctx.body = {
        success: true,
        message: 'Config deleted successfully'
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },


  updatePluginConfig : async (ctx) => {
    try {
      const { body } = ctx.request;

      const sanitizedBody = await validateConfig(body);

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
        githubToken: sanitizedBody.githubToken,
      }

      const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', "typ": "JWT" })
      .sign(decodedSecret);

      sanitizedBody.githubToken = jwt;
      
      await strapi.entityService?.create(`plugin::${pluginId}.config`, {
          data: sanitizedBody
      });
      ctx.body = {
        success: true,
        message: 'Config updated successfully'
      };
    } catch (err) {
      ctx.body = err;
    }
  }
});
