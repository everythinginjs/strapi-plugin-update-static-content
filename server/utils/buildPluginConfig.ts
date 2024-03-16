import type { Strapi } from '@strapi/strapi';
import protectedValue from './protectedValue';
import getPluginConfig from './getPluginConfig';

export default function buildPluginConfig(strapi: Strapi, isValueProtected: boolean = false) {
  const getPluginConfigByKey =
    getPluginConfig<(path: string, defaultValue?: unknown) => string>(strapi);

  return {
    githubToken: isValueProtected
      ? protectedValue(getPluginConfigByKey('githubToken').trim())
      : getPluginConfigByKey('githubToken').trim(),
    owner: getPluginConfigByKey('owner').trim(),
    repo: getPluginConfigByKey('repo').trim(),
    workflowId: getPluginConfigByKey('workflowId'),
    branch: getPluginConfigByKey('branch').trim(),
  };
}
