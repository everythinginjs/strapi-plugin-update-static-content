'use strict';

const buildPluginConfig = require('../utils/buildPluginConfig');
const axios = require('axios').default;

async function history() {
  const config = buildPluginConfig(strapi);
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${config.owner}/${config.repo}/actions/workflows/${config.workflowId}/runs?per_page=20&page=1&branch=${config.branch}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${config.githubToken}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function trigger() {
  const config = buildPluginConfig(strapi);
  try {
    const res = await axios.post(
      `https://api.github.com/repos/${config.owner}/${config.repo}/actions/workflows/${config.workflowId}/dispatches`,
      {
        ref: config.branch,
        inputs: {},
      },
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${config.githubToken}`,
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

async function getLogs(jobId) {
  const config = buildPluginConfig(strapi);
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${config.owner}/${config.repo}/actions/runs/${jobId}/logs`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${config.githubToken}`,
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

module.exports = {
  history,
  trigger,
  getLogs,
};
