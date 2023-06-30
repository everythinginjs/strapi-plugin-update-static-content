const pluginId = require('../../utils/pluginId');

module.exports = [
  {
    method: 'GET',
    path: '/config',
    handler: 'config.getPluginConfig',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.settings`],
          },
        },
      ],
    },
  },
  {
    method: 'GET',
    path: '/github-actions-history',
    handler: 'githubActions.history',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
    },
  },
  {
    method: 'POST',
    path: '/github-actions-trigger',
    handler: 'githubActions.trigger',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
    },
  },
  {
    method: 'GET',
    path: '/github-actions-jobs-log',
    handler: 'githubActions.log',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
    },
  },
];
