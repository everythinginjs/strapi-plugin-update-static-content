import React from 'react';
import pluginId from '../../../../utils/pluginId';
import { BaseHeaderLayout, Stack, Link, Typography, Option, Select } from '@strapi/design-system';
import useFetchData from '../../hooks/useFetchData';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import Guard from '../../components/Guard';
import TextField from '../../components/TextField';
import PageWrapper from '../../components/PageWrapper';

const SETTING = `${pluginId}.settings`;

const SettingPage = () => {
  // Hooks
  const { errors, isLoading, fetchedData } = useFetchData({
    url: `/${pluginId}/config`,
    method: 'GET',
  });
  const { branch, githubToken, owner, repo, roles, workflowId } = fetchedData;

  // Translations
  const PAGE_TITLE = useFormattedLabel(`${SETTING}.pagetitle`);
  const HEADER_TITLE = useFormattedLabel(`${SETTING}.headers.title`);
  const HEADER_SUBTITLE = useFormattedLabel(`${SETTING}.headers.subtitle`);

  const GITHUB_TOKEN = useFormattedLabel(`${SETTING}.fields.githubtoken`);
  const REPO = useFormattedLabel(`${SETTING}.fields.repo`);
  const WORKFLOWID = useFormattedLabel(`${SETTING}.fields.workflowid`);
  const OWNER = useFormattedLabel(`${SETTING}.fields.owner`);
  const BRANCH = useFormattedLabel(`${SETTING}.fields.branch`);
  const ROLES = useFormattedLabel(`${SETTING}.fields.roles`);

  const HINT_GITHUB_TOKEN = useFormattedLabel(`${SETTING}.fields.hint.githubtoken`);
  const HINT_OWNER = useFormattedLabel(`${SETTING}.fields.hint.owner`);
  const HINT_REPO = useFormattedLabel(`${SETTING}.fields.hint.repo`);
  const HINT_WORKFLOWID = useFormattedLabel(`${SETTING}.fields.hint.workflowid`);
  const HINT_BRANCH = useFormattedLabel(`${SETTING}.fields.hint.branch`);
  const HINT_ROLES = useFormattedLabel(`${SETTING}.fields.hint.roles`);

  const PLACEHOLDER_GITHUB_TOKEN = useFormattedLabel(`${SETTING}.fields.placeholder.githubtoken`);
  const PLACEHOLDER_OWNER = useFormattedLabel(`${SETTING}.fields.placeholder.owner`);
  const PLACEHOLDER_REPO = useFormattedLabel(`${SETTING}.fields.placeholder.repo`);
  const PLACEHOLDER_WORKFLOWID = useFormattedLabel(`${SETTING}.fields.placeholder.workflowid`);
  const PLACEHOLDER_BRANCH = useFormattedLabel(`${SETTING}.fields.placeholder.branch`);
  const BUTTON_DETAILS = useFormattedLabel(`${pluginId}.button.details`);

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
          <Select
            label={ROLES}
            name="roles"
            value={roles}
            multi
            withTags
            disabled
            required
            hint={
              <Typography variant="omega">
                {HINT_ROLES}{' '}
                <Link
                  href="https://docs.strapi.io/user-docs/latest/users-roles-permissions/configuring-administrator-roles.html"
                  isExternal
                >
                  {BUTTON_DETAILS}
                </Link>
              </Typography>
            }
          >
            {roles?.map((role) => {
              return (
                <Option key={role} value={role?.replaceAll(' ', '-')}>
                  {role}
                </Option>
              );
            })}
          </Select>
        </Stack>
      </Guard>
    </PageWrapper>
  );
};

export default SettingPage;
