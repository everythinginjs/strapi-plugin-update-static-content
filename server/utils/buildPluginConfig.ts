import type { Strapi } from '@strapi/strapi';
import Config from '../../types/Config';

export default async function buildPluginConfig(strapi: Strapi) {
  const config = await strapi.entityService?.findOne('plugin::update-static-content.config', 1) as unknown;
  return config as Config | undefined | null;
}
