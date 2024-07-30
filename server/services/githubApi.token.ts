import {GithubApi} from "./githubApi.abstract";
import buildPluginConfig from "../utils/buildPluginConfig";
import axios from "axios";

export default class GithubApiToken extends GithubApi {
  constructor(private strapi: any) {
    super();
  }

  async history(): Promise<unknown> {
    try {
      const { owner, repo, workflowId, branch, githubToken} = buildPluginConfig(this.strapi);
      return await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=20&page=1&branch=${branch}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${githubToken}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async trigger(): Promise<unknown> {
    try {
      const { owner, repo, workflowId, branch, githubToken } = buildPluginConfig(this.strapi);
      return await axios.post(
        `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
        {
          ref: branch,
          inputs: {},
        },
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${githubToken}`,
          },
        }
      );
    } catch (err) {
      return {
        // @ts-ignore
        status: err.response.status,
        // @ts-ignore
        statusText: err.response.statusText,
      };
    }
  }

// api.github.com/repos/paritytech-stg/parityio/actions/jobs/10160553975/logs
  async getLogs(jobId: string): Promise<unknown> {
    try {
      const { owner, repo, githubToken } = buildPluginConfig(this.strapi);
      const res = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/actions/runs/${jobId}/logs`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${githubToken}`,
          },
        }
      );
      return res.request.res.responseUrl;
    } catch (err) {
      console.log(err);
      return {
        // @ts-ignore
        status: err.response.status,
        // @ts-ignore
        statusText: err.response.statusText,
      };
    }
  }
}
