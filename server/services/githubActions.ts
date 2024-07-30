import buildPluginConfig from '../utils/buildPluginConfig';
import axios from 'axios';
import {GitHubAuthType} from "../config/index";
import {GithubApi} from "./githubApi.abstract";
import GithubApiToken from "./githubApi.token";
import GithubApiApp from "./githubApi.app";

export default ({strapi}) => {
  const { githubAuthType } = buildPluginConfig(strapi);
  let githubApi: GithubApi;

  if (githubAuthType === GitHubAuthType.TOKEN) {
    githubApi = new GithubApiToken(strapi);
  } else if (githubAuthType === GitHubAuthType.APP) {
    githubApi = new GithubApiApp(strapi);
  } else {
    throw new Error(`Invalid GitHub auth type, should be either ${GitHubAuthType.TOKEN} or ${GitHubAuthType.APP}`);
  }

  return {
    async history() {
      return await githubApi.history();
    },

    async trigger() {
      return await githubApi.trigger();
    },

    async getLogs(jobId: string) {
      return await githubApi.getLogs(jobId);
    }
  }
};
