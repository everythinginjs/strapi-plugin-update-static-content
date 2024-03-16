import type { Strapi } from '@strapi/strapi';
import pluginId from '../../admin/src/pluginId';

export default function getPluginConfig<T>(strapi: Strapi): T {
  return strapi.plugin(pluginId).config as T;
}
