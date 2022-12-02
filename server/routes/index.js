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
];
