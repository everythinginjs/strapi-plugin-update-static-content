import buildPluginConfig from '../utils/buildPluginConfig';
import axios from 'axios';

async function history() {
  try {
    const { owner, repo, workflowId, branch, githubToken } = buildPluginConfig(strapi);
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=20&page=1&branch=${branch}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${githubToken}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function trigger() {
  try {
    const { owner, repo, workflowId, branch, githubToken } = buildPluginConfig(strapi);
    const res = await axios.post(
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
    return res;
  } catch (err) {
    return {
      status: err.response.status,
      statusText: err.response.statusText,
    };
  }
}

async function getLogs(jobId: string) {
  try {
    const { owner, repo, githubToken } = buildPluginConfig(strapi);
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
      status: err.response.status,
      statusText: err.response.statusText,
    };
  }
}

export default { history, trigger, getLogs };
