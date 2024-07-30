import type { Strapi } from '@strapi/strapi';
import pluginId from '../../admin/src/pluginId';

export default function getPluginConfig(strapi: Strapi) {
  return (key: string, defaultValue?: string) => {
    const config = strapi.plugin(pluginId).config<string, string>(key, defaultValue);

    if (!config) {
      throw new Error(`Plugin config "${key}" not found`);
    }

    return config;
  }
}

