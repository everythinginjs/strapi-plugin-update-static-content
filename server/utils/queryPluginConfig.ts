import type { Strapi } from '@strapi/strapi';
import * as jose from 'jose';
import pluginId from '../../admin/src/pluginId';
import Config from '../../types/Config';

async function decryptToken(c : Config) {
  const githubToken = c.githubToken;
  if (githubToken) {
    const secret = strapi.plugin(pluginId).config("JWT_SECRET") as string | undefined | null;
    if (!secret) {
      throw new Error('JWT_SECRET not found in server config');
    }
    const decodedSecret = jose.base64url.decode(secret);
    const { payload: decryptedPayload } = await jose.jwtVerify(githubToken, decodedSecret);
    const { githubToken: decryptedGithubToken } = decryptedPayload;
    c.githubToken = decryptedGithubToken as string;
    return c
  }
}

export async function queryPluginConfig(strapi: Strapi) {
  try {
    if (!strapi.entityService) {
      throw new Error('Entity service not found');
    }
    const config = await strapi.entityService.findMany('plugin::update-static-content.config');
    if (!config) {
      throw new Error('Config not found');
    }
    
    const processedConfig = await Promise.all(config.map(decryptToken));
    return processedConfig;
  }
  catch (err) {
    throw err;
  }
}


export async function queryPluginConfigId(strapi: Strapi, id: string) {
  try {
    if (!strapi.entityService) {
      throw new Error('Entity service not found');
    }
    const config = await strapi.entityService.findOne('plugin::update-static-content.config', id) as Config | null;
    if (!config) {
      throw new Error('Config not found');
    }
      const encryptedConfig = await decryptToken(config);
      if (!encryptedConfig) {
        throw new Error('Error encrypting token');
      }
      return encryptedConfig;
  }
  catch (err) {
    throw err;
  }
}