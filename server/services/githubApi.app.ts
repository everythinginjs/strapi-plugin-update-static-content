import {GithubApi} from "./githubApi.abstract";
import buildPluginConfig from "../utils/buildPluginConfig";
import axios from "axios";
import { App } from "octokit"

export default class GithubApiApp extends GithubApi {
  private app: App;
  private readonly owner: string;
  private readonly repo: string;
  private readonly workflowId: string;
  private readonly branch: string;
  private readonly installationId: number;

  constructor(private strapi: any) {
    super();
    const {githubAppId, githubPrivateKey, githubInstallationId, owner, repo, workflowId, branch} = buildPluginConfig(this.strapi);

    if (!githubAppId || !githubPrivateKey || !githubInstallationId) {
      throw new Error('`githubAppId`, `githubPrivateKey`, and `githubInstallationId` keys in your plugin config have to be set');
    }

    this.owner = owner;
    this.repo = repo;
    this.workflowId = workflowId;
    this.branch = branch;
    this.installationId = parseInt(githubInstallationId, 10);

    this.app = new App({
      appId: githubAppId,
      privateKey: githubPrivateKey,
    });
  }

  private async getOctokit() {
    await this.app.octokit.rest.apps.getAuthenticated();
    return await this.app.getInstallationOctokit(this.installationId);
  }

  async history(): Promise<unknown> {
    const octokit = await this.getOctokit();
    try {
      return await octokit.rest.actions.listWorkflowRuns({
        owner: this.owner,
        repo: this.repo,
        workflow_id: this.workflowId,
        branch: this.branch,
        per_page: 20,
        page: 1,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async trigger(): Promise<unknown> {
    const octokit = await this.getOctokit();
    try {
      return await octokit.rest.actions.createWorkflowDispatch({
        owner: this.owner,
        repo: this.repo,
        workflow_id: this.workflowId,
        ref: this.branch,
        inputs: {},
      });
    } catch (err) {
      return {
        // @ts-ignore
        status: err.response.status,
        // @ts-ignore
        statusText: err.response.statusText,
      };
    }
  }


  async getLogs(jobId: string): Promise<unknown> {
    const octokit = await this.getOctokit();
    try {
      const res = await octokit.rest.actions.downloadWorkflowRunLogs({
        owner: this.owner,
        repo: this.repo,
        run_id: parseInt(jobId, 10),
      });

      return res.url;
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
