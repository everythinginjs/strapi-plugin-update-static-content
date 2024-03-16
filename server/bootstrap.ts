import pluginName from '../admin/src/pluginId';
import type { Strapi } from '@strapi/strapi';

export default async ({ strapi }: { strapi: Strapi }) => {
  if (typeof strapi.admin == 'undefined') return;

  const actions = [
    {
      section: 'plugins',
      subCategory: 'general',
      displayName: 'Trigger builds',
      uid: 'trigger',
      pluginName,
    },
    {
      section: 'settings',
      category: pluginName,
      displayName: 'Access settings',
      uid: 'settings',
      pluginName,
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
