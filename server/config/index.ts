export enum GitHubAuthType {
  TOKEN = 'token',
  APP = 'app'
}

type Validator = Partial<{
  owner: string;
  repo: string;
  branch: string;
  workflowId: string;
  githubAuthType: GitHubAuthType;
  githubToken: string;
  githubAppId: string;
  githubPrivateKey: string;
  githubInstallationId: string;
}>;

export default {
  default: {
    githubAuthType: GitHubAuthType.TOKEN,
  },
  validator({
              githubAuthType,
              githubToken,
              githubAppId,
              githubInstallationId,
              githubPrivateKey,
              branch,
              workflowId,
              owner,
              repo
            }: Validator) {
    if (!owner || typeof owner !== 'string') {
      throw new Error('`owner` key in your plugin config has to be a string');
    }
    if (!repo || typeof repo !== 'string') {
      throw new Error('`repo` key in your plugin config has to be a string');
    }
    if (!branch || typeof branch !== 'string') {
      throw new Error('`branch` key in your plugin config has to be a string');
    }
    if (!workflowId || typeof workflowId !== 'string') {
      throw new Error('`workflowId` key in your plugin workflowId has to be an string');
    }
    if (githubAuthType && [GitHubAuthType.TOKEN, GitHubAuthType.APP].includes(githubAuthType)) {
      if (githubAuthType === GitHubAuthType.TOKEN && !githubToken) {
        throw new Error('`githubToken` key in your plugin must be defined config has to be a string');
      }

      if (githubAuthType === GitHubAuthType.APP) {
        if (!githubAppId) {
          throw new Error('`githubAppId` key in your plugin config has to be a string');
        }
        if (!githubPrivateKey) {
          throw new Error('`githubPrivateKey` key in your plugin config has to be a string');
        }
        if (!githubInstallationId) {
          throw new Error('`githubInstallationId` key in your plugin config has to be a string');
        }
      }
    } else {
      throw new Error(`\`githubAuthType\` key in your plugin config has to be either \`${GitHubAuthType.APP}\` or \`${GitHubAuthType.TOKEN}\``);
    }
  }
};
