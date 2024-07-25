import type { Strapi } from '@strapi/strapi';
import * as jose from 'jose';
import pluginId from '../../admin/src/pluginId';

export default async function buildPluginConfig(strapi: Strapi) {
  try {
    const config = await strapi.entityService?.findOne('plugin::update-static-content.config', 1);
    if (!config) {
      throw new Error('Config not found');
    }
    const githubToken = config.githubToken;

    if (githubToken) {
      const secret = strapi.plugin(pluginId).config("JWT_SECRET") as string | undefined | null;
      if (!secret) {
        throw new Error('JWT_SECRET not found in server config');
      }
      const decodedSecret = jose.base64url.decode(secret);
      const { payload: decryptedPayload } = await jose.jwtVerify(githubToken, decodedSecret);
      const { githubToken: decryptedGithubToken } = decryptedPayload;
      config.githubToken = decryptedGithubToken as string;
    }
    return config;
  }
  catch (err) {
    throw err;
  }
}
