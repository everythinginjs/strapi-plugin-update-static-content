'use strict';

const protectedValue = require('./protectedValue');
const getPluginConfig = require('./getPluginConfig');

function buildPluginConfig(strapi, isValueProtected = false) {
  const getPluginConfigByKey = getPluginConfig(strapi);

  return {
    githubToken: isValueProtected
      ? protectedValue(getPluginConfigByKey('githubToken')?.trim())
      : getPluginConfigByKey('githubToken')?.trim(),
    owner: getPluginConfigByKey('owner')?.trim(),
    repo: getPluginConfigByKey('repo')?.trim(),
    workflowId: getPluginConfigByKey('workflowId'),
    branch: getPluginConfigByKey('branch')?.trim(),
  };
}

module.exports = buildPluginConfig;
