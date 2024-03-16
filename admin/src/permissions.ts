import pluginId from './pluginId';

const pluginPermissions = {
  settings: [
    {
      action: `plugin::${pluginId}.settings`,
      subject: null,
    },
  ],
  trigger: [
    {
      action: `plugin::${pluginId}.trigger`,
      subject: null,
    },
  ],
};

export default pluginPermissions;
