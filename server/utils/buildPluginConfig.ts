import type { Strapi } from '@strapi/strapi';
import protectedValue from './protectedValue';
import getPluginConfig from "./getPluginConfig";
import {GitHubAuthType} from "../config/index";

export default function buildPluginConfig(strapi: Strapi, isValueProtected: boolean = false) {
  const getPluginConfigByKey = getPluginConfig(strapi);

  const githubAuthType = getPluginConfigByKey('githubAuthType');
  const owner = getPluginConfigByKey('owner');
  const repo = getPluginConfigByKey('repo');
  const workflowId = getPluginConfigByKey('workflowId');
  const branch = getPluginConfigByKey('branch');

  if (githubAuthType === GitHubAuthType.TOKEN) {
    const githubToken = getPluginConfigByKey('githubToken');
    return {
      githubAuthType,
      githubToken: isValueProtected ? protectedValue(githubToken) : githubToken,
      owner,
      repo,
      workflowId,
      branch,
    };
  } else if (githubAuthType === GitHubAuthType.APP) {
    const githubAppId = getPluginConfigByKey('githubAppId');
    const githubPrivateKey = getPluginConfigByKey('githubPrivateKey');
    const githubInstallationId = getPluginConfigByKey('githubInstallationId');

    return {
      githubAuthType,
      githubAppId,
      githubPrivateKey: isValueProtected ? protectedValue(githubPrivateKey) : githubPrivateKey,
      githubInstallationId,
      owner,
      repo,
      workflowId,
      branch,
    };
  } else {
    throw new Error(`\`githubAuthType\` key in your plugin config has to be either \`${GitHubAuthType.TOKEN}\` or \`${GitHubAuthType.APP}\``);
  }
}
