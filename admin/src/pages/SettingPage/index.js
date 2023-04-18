import React from 'react';
import pluginId from '../../../../utils/pluginId';
import pluginPermissions from '../../permissions';
import { CheckPagePermissions } from '@strapi/helper-plugin';
import { BaseHeaderLayout, Stack, Link, Typography } from '@strapi/design-system';
import useFetchData from '../../hooks/useFetchData';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import Guard from '../../components/Guard';
import TextField from '../../components/TextField';
import PageWrapper from '../../components/PageWrapper';

const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.settings}>
    <SettingPage />
  </CheckPagePermissions>
);

const SettingPage = () => {
  // Hooks
  const { errors, isLoading, fetchedData } = useFetchData({
    url: `/${pluginId}/config`,
    method: 'GET',
  });
  const { branch, githubToken, owner, repo, workflowId } = fetchedData;

  // Translations
  const PAGE_TITLE = useFormattedLabel('settings.pagetitle');
  const HEADER_TITLE = useFormattedLabel('settings.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('settings.headers.subtitle');

  const GITHUB_TOKEN = useFormattedLabel('settings.fields.githubtoken');
  const REPO = useFormattedLabel('settings.fields.repo');
  const WORKFLOWID = useFormattedLabel('settings.fields.workflowid');
  const OWNER = useFormattedLabel('settings.fields.owner');
  const BRANCH = useFormattedLabel('settings.fields.branch');

  const HINT_GITHUB_TOKEN = useFormattedLabel('settings.fields.hint.githubtoken');
  const HINT_OWNER = useFormattedLabel('settings.fields.hint.owner');
  const HINT_REPO = useFormattedLabel('settings.fields.hint.repo');
  const HINT_WORKFLOWID = useFormattedLabel('settings.fields.hint.workflowid');
  const HINT_BRANCH = useFormattedLabel('settings.fields.hint.branch');

  const PLACEHOLDER_GITHUB_TOKEN = useFormattedLabel('settings.fields.placeholder.githubtoken');
  const PLACEHOLDER_OWNER = useFormattedLabel('settings.fields.placeholder.owner');
  const PLACEHOLDER_REPO = useFormattedLabel('settings.fields.placeholder.repo');
  const PLACEHOLDER_WORKFLOWID = useFormattedLabel('settings.fields.placeholder.workflowid');
  const PLACEHOLDER_BRANCH = useFormattedLabel('settings.fields.placeholder.branch');
  const BUTTON_DETAILS = useFormattedLabel('button.details');

  return (
    <PageWrapper
      isLoading={isLoading}
      baseHeaderLayout={<BaseHeaderLayout title={HEADER_TITLE} subtitle={HEADER_SUBTITLE} />}
      pageTitle={PAGE_TITLE}
    >
      <Guard errors={errors}>
        <Stack spacing={6}>
          <TextField
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
          <TextField
            label={OWNER}
            aria-label={OWNER}
            name="owner"
            value={owner || PLACEHOLDER_OWNER}
            disabled
            required
            HintMessage={<Typography variant="omega">{HINT_OWNER}</Typography>}
          />
          <TextField
            label={REPO}
            aria-label={REPO}
            name="repo"
            value={repo || PLACEHOLDER_REPO}
            disabled
            required
            HintMessage={<Typography variant="omega">{HINT_REPO}</Typography>}
          />
          <TextField
            label={WORKFLOWID}
            aria-label={WORKFLOWID}
            name="workflow_id"
            value={workflowId || PLACEHOLDER_WORKFLOWID}
            disabled
            required
            HintMessage={<Typography variant="omega">{HINT_WORKFLOWID}</Typography>}
          />
          <TextField
            label={BRANCH}
            aria-label={BRANCH}
            name="branch"
            value={branch || PLACEHOLDER_BRANCH}
            disabled
            required
            HintMessage={<Typography variant="omega">{HINT_BRANCH}</Typography>}
          />
        </Stack>
      </Guard>
    </PageWrapper>
  );
};

export default ProtectedPage;
