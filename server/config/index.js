'use strict';

module.exports = {
  default: {},
  validator({ owner, repo, branch, workflowId, githubToken, roles }) {
    if (owner && typeof owner !== 'string') {
      throw new Error('`owner` key in yout plugin config has to be a string');
    }
    if (repo && typeof repo !== 'string') {
      throw new Error('`repo` key in your plugin config has to be a string');
    }
    if (branch && typeof branch !== 'string') {
      throw new Error('`branch` key in your plugin config has to be a string');
    }
    if (workflowId && typeof workflowId !== 'string') {
      throw new Error('`workflowId` key in your plugin workflowId has to be an string');
    }
    if (githubToken && typeof githubToken !== 'string') {
      throw new Error('`githubToken` key in your plugin config has to be a string');
    }
    if (roles && !Array.isArray(roles)) {
      throw new Error('`roles` key in your plugin config has to be an array of strings');
    }
  },
};
