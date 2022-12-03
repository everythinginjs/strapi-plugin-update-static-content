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

module.exports = {
  history,
};
