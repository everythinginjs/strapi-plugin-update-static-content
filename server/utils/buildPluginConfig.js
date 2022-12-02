'use strict';

const protectedValue = require('./protectedValue');
const getPluginConfig = require('./getPluginConfig');
const FALLBACK_ROLES_VALUES = require('./fallbackRoles');

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
    roles: getPluginConfigByKey('roles', FALLBACK_ROLES_VALUES),
  };
}

module.exports = buildPluginConfig;
