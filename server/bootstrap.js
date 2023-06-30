'use strict';
const pluginName = require('../utils/pluginId');

module.exports = async ({ strapi }) => {
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
      category: 'static site build',
      displayName: 'Access settings',
      uid: 'settings',
      pluginName,
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
