'use strict';

const pluginId = require('../../utils/pluginId');

function getPluginConfig(strapi) {
  return strapi.plugin(pluginId).config;
}

module.exports = getPluginConfig;
