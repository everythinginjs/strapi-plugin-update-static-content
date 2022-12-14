const pluginId = require('../../utils/pluginId');

module.exports = [
  {
    method: 'GET',
    path: '/config',
    handler: 'config.getPluginConfig',
    config: {
      policies: [`plugin::${pluginId}.checkConfigRoles`],
    },
  },
  {
    method: 'GET',
    path: '/github-actions-history',
    handler: 'githubActions.history',
    config: {
      policies: [
        `plugin::${pluginId}.checkConfigRoles`,
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
        `plugin::${pluginId}.checkConfigRoles`,
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
        `plugin::${pluginId}.checkConfigRoles`,
        `plugin::${pluginId}.validatePluginConfig`,
      ],
    },
  },
];
