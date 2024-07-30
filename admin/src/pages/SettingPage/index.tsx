import {BaseHeaderLayout, Link, Stack, Typography} from '@strapi/design-system';
import {CheckPagePermissions} from '@strapi/helper-plugin';
import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import TextField from '../../components/TextField';
import useFetch from '../../hooks/useFetch';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';
import {GitHubAuthType} from "../../../../server/config/index";

const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.settings}>
    <SettingPage/>
  </CheckPagePermissions>
);

type Data = {
  branch: string;
  githubToken: string;
  owner: string;
  repo: string;
  workflowId: string;
  githubAuthType: GitHubAuthType;
  githubAppId: string;
  githubPrivateKey: string;
  githubInstallationId: string;
};

const SettingPage = () => {
  // Hooks
  const [data, isLoading] = useFetch<Data>(`/${pluginId}/config`);
  const {branch, githubToken, owner, repo, workflowId, githubAppId, githubPrivateKey, githubInstallationId, githubAuthType} = data;

  // Translations
  const PAGE_TITLE = useFormattedLabel('settings.pagetitle');
  const HEADER_TITLE = useFormattedLabel('settings.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('settings.headers.subtitle');

  const GITHUB_AUTH_TYPE = useFormattedLabel('settings.fields.githubauthtype');
  const GITHUB_TOKEN = useFormattedLabel('settings.fields.githubtoken');
  const GITHUB_APP_ID = useFormattedLabel('settings.fields.githubappid');
  const GITHUB_PRIVATE_KEY = useFormattedLabel('settings.fields.githubprivatekey');
  const GITHUB_INSTALLATION_ID = useFormattedLabel('settings.fields.githubinstallationid');
  const REPO = useFormattedLabel('settings.fields.repo');
  const WORKFLOWID = useFormattedLabel('settings.fields.workflowid');
  const OWNER = useFormattedLabel('settings.fields.owner');
  const BRANCH = useFormattedLabel('settings.fields.branch');

  const HINT_GITHUB_AUTH_TYPE = useFormattedLabel('settings.fields.hint.githubauthtype');
  const HINT_GITHUB_TOKEN = useFormattedLabel('settings.fields.hint.githubtoken');
  const HINT_GITHUB_APP_ID = useFormattedLabel('settings.fields.hint.githubappid');
  const HINT_GITHUB_PRIVATE_KEY = useFormattedLabel('settings.fields.hint.githubprivatekey');
  const HINT_GITHUB_INSTALLATION_ID = useFormattedLabel('settings.fields.hint.githubinstallationid');
  const HINT_OWNER = useFormattedLabel('settings.fields.hint.owner');
  const HINT_REPO = useFormattedLabel('settings.fields.hint.repo');
  const HINT_WORKFLOWID = useFormattedLabel('settings.fields.hint.workflowid');
  const HINT_BRANCH = useFormattedLabel('settings.fields.hint.branch');

  const PLACEHOLDER_GITHUB_AUTH_TYPE = useFormattedLabel('settings.fields.placeholder.githubauthtype');
  const PLACEHOLDER_GITHUB_TOKEN = useFormattedLabel('settings.fields.placeholder.githubtoken');
  const PLACEHOLDER_GITHUB_APP_ID = useFormattedLabel('settings.fields.placeholder.githubappid');
  const PLACEHOLDER_GITHUB_PRIVATE_KEY = useFormattedLabel('settings.fields.placeholder.githubprivatekey');
  const PLACEHOLDER_GITHUB_INSTALLATION_ID = useFormattedLabel('settings.fields.placeholder.githubinstallationid');
  const PLACEHOLDER_OWNER = useFormattedLabel('settings.fields.placeholder.owner');
  const PLACEHOLDER_REPO = useFormattedLabel('settings.fields.placeholder.repo');
  const PLACEHOLDER_WORKFLOWID = useFormattedLabel('settings.fields.placeholder.workflowid');
  const PLACEHOLDER_BRANCH = useFormattedLabel('settings.fields.placeholder.branch');
  const BUTTON_DETAILS = useFormattedLabel('button.details');

  console.log(`githubPrivateKey ${githubPrivateKey}, githubInstallationId ${githubInstallationId}, githubAppId ${githubAppId}`);
  return (
    <PageWrapper
      isLoading={isLoading}
      baseHeaderLayout={<BaseHeaderLayout title={HEADER_TITLE} subtitle={HEADER_SUBTITLE}/>}
      pageTitle={PAGE_TITLE}
    >
      <Stack spacing={6}>
        <TextField
          type="text"
          label={GITHUB_AUTH_TYPE}
          aria-label={GITHUB_AUTH_TYPE}
          name="githubAuthType"
          value={githubAuthType || PLACEHOLDER_GITHUB_AUTH_TYPE}
          disabled
          required
          HintMessage={<Typography variant="omega">{HINT_GITHUB_AUTH_TYPE}</Typography>}
        />
        {githubAuthType == GitHubAuthType.TOKEN ? (
          <TextField
            type="text"
            label={GITHUB_TOKEN}
            aria-label={GITHUB_TOKEN}
            name="githubToken"
            value={githubToken || PLACEHOLDER_GITHUB_TOKEN}
            disabled
            required
            HintMessage={
              <Typography variant="omega">
                {HINT_GITHUB_TOKEN}{' '}
                <Link
                  href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                  isExternal
                >
                  {BUTTON_DETAILS}
                </Link>
              </Typography>
            }
          />
        ) : (
          <>
            <TextField
              type="text"
              label={GITHUB_APP_ID}
              aria-label={GITHUB_APP_ID}
              name="githubAppId"
              value={githubAppId || PLACEHOLDER_GITHUB_APP_ID}
              disabled
              required
              HintMessage={
                <Typography variant="omega">
                  {HINT_GITHUB_APP_ID}{' '}
                  <Link
                    href="https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps"
                    isExternal
                  >
                    {BUTTON_DETAILS}
                  </Link>
                </Typography>
              }
            />
            <TextField
              type="text"
              label={GITHUB_PRIVATE_KEY}
              aria-label={GITHUB_PRIVATE_KEY}
              name="githubPrivateKey"
              value={githubPrivateKey || PLACEHOLDER_GITHUB_PRIVATE_KEY}
              disabled
              required
              HintMessage={<Typography variant="omega">{HINT_GITHUB_PRIVATE_KEY}</Typography>}
            />
            <TextField
              type="text"
              label={GITHUB_INSTALLATION_ID}
              aria-label={GITHUB_INSTALLATION_ID}
              name="githubInstallationId"
              value={githubInstallationId || PLACEHOLDER_GITHUB_INSTALLATION_ID}
              disabled
              required
              HintMessage={<Typography variant="omega">{HINT_GITHUB_INSTALLATION_ID}</Typography>}
            />
          </>
        )
        }

        <TextField
          type="text"
          label={OWNER}
          aria-label={OWNER}
          name="owner"
          value={owner || PLACEHOLDER_OWNER}
          disabled
          required
          HintMessage={<Typography variant="omega">{HINT_OWNER}</Typography>}
        />
        <TextField
          type="text"
          label={REPO}
          aria-label={REPO}
          name="repo"
          value={repo || PLACEHOLDER_REPO}
          disabled
          required
          HintMessage={<Typography variant="omega">{HINT_REPO}</Typography>}
        />
        <TextField
          type="text"
          label={WORKFLOWID}
          aria-label={WORKFLOWID}
          name="workflow_id"
          value={workflowId || PLACEHOLDER_WORKFLOWID}
          disabled
          required
          HintMessage={<Typography variant="omega">{HINT_WORKFLOWID}</Typography>}
        />
        <TextField
          type="text"
          label={BRANCH}
          aria-label={BRANCH}
          name="branch"
          value={branch || PLACEHOLDER_BRANCH}
          disabled
          required
          HintMessage={<Typography variant="omega">{HINT_BRANCH}</Typography>}
        />
      </Stack>
    </PageWrapper>
  );
};

export default ProtectedPage;
