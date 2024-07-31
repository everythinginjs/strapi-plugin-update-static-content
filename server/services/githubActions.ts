import { queryPluginConfig, queryPluginConfigId } from '../utils/queryPluginConfig';
import axios from 'axios';

async function getConfig(id) {
  // if the id is 0, it means the user is trying to get the first config
  if (id === '0') {
    const config = await queryPluginConfig(strapi);
    return config[0];
  }
  else {
    return await queryPluginConfigId(strapi, id);
  }
}

async function history(id: string) {
  try {
    const config = await getConfig(id);
    if (!config) {
      return {
        status: 404,
        statusText: 'Config not found',
      };
    }
    const { githubAccount, repo, workflow, branch, githubToken } = config;
    const res = await axios.get(
      `https://api.github.com/repos/${githubAccount}/${repo}/actions/workflows/${workflow}/runs?per_page=20&page=1&branch=${branch}`,
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

async function trigger(id: string) {
  try {
    const config = await getConfig(id);
    if (!config) {
      return {
        status: 404,
        statusText: 'Config not found',
      };
    }
    const { githubAccount, repo, workflow, branch, githubToken } = config;
    const res = await axios.post(
      `https://api.github.com/repos/${githubAccount}/${repo}/actions/workflows/${workflow}/dispatches`,
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

async function getLogs(jobId: string, id: string) {
  try {
    const config = await getConfig(id);
    if (!config) {
      return {
        status: 404,
        statusText: 'Config not found',
      };
    }
    const { githubAccount, repo, githubToken } = config;
    const res = await axios.get(
      `https://api.github.com/repos/${githubAccount}/${repo}/actions/runs/${jobId}/logs`,
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