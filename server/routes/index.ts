import pluginId from '../../admin/src/pluginId';

export default [
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
    path: '/config/:id',
    handler: 'config.getPluginConfigById',
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
    method: 'DELETE',
    path: '/config/:id',
    handler: 'config.deletePluginConfigById',
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
    method: 'POST',
    path: '/config',
    handler: 'config.updatePluginConfig',
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
      ],
    },
  },
  
];
