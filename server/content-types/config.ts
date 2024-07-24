export default {
    kind: 'collectionType',
    collectionName: 'config',
    info: {
      name: 'Config',
      displayName: 'config',
      singularName: 'config',
      pluralName: 'configs',
      tableName: 'config',
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {
      'content-manager': {
        visible: false,
      },
      'content-type-builder': {
        visible: false,
      },
    },
    attributes: {
      githubToken: {
        type: 'string',
        required: true,
      },
      branch: {
        type: 'string',
        required: true,
      },
      githubAccount: {
        type: 'string',
        required: true,
      },
      repo: {
        type: 'string',
        required: true,
      },
      workflow: {
        type: 'string',
        required: true,
      },
    },
  };