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
  var { errors, isLoading, fetchedData } = useFetchData({
    url: `/${pluginId}/config`,
    method: 'GET',
  });
  var { branch, githubToken, owner, repo, roles, workflowId } = fetchedData;

  // Titles
  const SETTING_PAGE_TITLE = useFormattedLabel(`${SETTING}.pagetitle`);
  const SETTING_HEADER_TITLE = useFormattedLabel(`${SETTING}.headers.title`);
  const SETTING_HEADER_SUBTITLE = useFormattedLabel(`${SETTING}.headers.subtitle`);

  // Fields
  const SETTING_GITHUB_TOKEN = useFormattedLabel(`${SETTING}.fields.githubtoken`);
  const SETTING_REPO = useFormattedLabel(`${SETTING}.fields.repo`);
  const SETTING_WORKFLOWID = useFormattedLabel(`${SETTING}.fields.workflowid`);
  const SETTING_OWNER = useFormattedLabel(`${SETTING}.fields.owner`);
  const SETTING_BRANCH = useFormattedLabel(`${SETTING}.fields.branch`);
  const SETTING_ROLES = useFormattedLabel(`${SETTING}.fields.roles`);

  // Hints
  const SETTING_FIELDS_HINT_GITHUB_TOKEN = useFormattedLabel(`${SETTING}.fields.hint.githubtoken`);
  const SETTING_FIELDS_HINT_OWNER = useFormattedLabel(`${SETTING}.fields.hint.owner`);
  const SETTING_FIELDS_HINT_REPO = useFormattedLabel(`${SETTING}.fields.hint.repo`);
  const SETTING_FIELDS_HINT_WORKFLOWID = useFormattedLabel(`${SETTING}.fields.hint.workflowid`);
  const SETTING_FIELDS_HINT_BRANCH = useFormattedLabel(`${SETTING}.fields.hint.branch`);
  const SETTING_FIELDS_HINT_ROLES = useFormattedLabel(`${SETTING}.fields.hint.roles`);

  // Placeholders
  const SETTINGS_FIELDS_GITHUB_TOKEN_PLACEHOLDER = useFormattedLabel(
    `${SETTING}.fields.placeholder.githubtoken`
  );
  const SETTINGS_FIELDS_OWNER_PLACEHOLDER = useFormattedLabel(
    `${SETTING}.fields.placeholder.owner`
  );
  const SETTINGS_FIELDS_REPO_PLACEHOLDER = useFormattedLabel(`${SETTING}.fields.placeholder.repo`);
  const SETTINGS_FIELDS_WORKFLOWID_PLACEHOLDER = useFormattedLabel(
    `${SETTING}.fields.placeholder.workflowid`
  );
  const SETTINGS_FIELDS_BRANCH_PLACEHOLDER = useFormattedLabel(
    `${SETTING}.fields.placeholder.branch`
  );

  return (
    <PageWrapper
      isLoading={isLoading}
      baseHeaderLayout={
        <BaseHeaderLayout title={SETTING_HEADER_TITLE} subtitle={SETTING_HEADER_SUBTITLE} />
      }
      pageTitle={SETTING_PAGE_TITLE}
    >
      <Guard errors={errors}>
        <Stack spacing={6}>
          <TextField
            label={SETTING_GITHUB_TOKEN}
            aria-label={SETTING_GITHUB_TOKEN}
            name="githubToken"
            value={githubToken || SETTINGS_FIELDS_GITHUB_TOKEN_PLACEHOLDER}
            disabled
            required
            HintMessage={
              <Typography variant="omega">
                {SETTING_FIELDS_HINT_GITHUB_TOKEN}{' '}
                <Link
                  href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                  isExternal
                >
                  Details
                </Link>
              </Typography>
            }
          />
          <TextField
            label={SETTING_OWNER}
            aria-label={SETTING_OWNER}
            name="owner"
            value={owner || SETTINGS_FIELDS_OWNER_PLACEHOLDER}
            disabled
            required
            HintMessage={<Typography variant="omega">{SETTING_FIELDS_HINT_OWNER}</Typography>}
          />
          <TextField
            label={SETTING_REPO}
            aria-label={SETTING_REPO}
            name="repo"
            value={repo || SETTINGS_FIELDS_REPO_PLACEHOLDER}
            disabled
            required
            HintMessage={<Typography variant="omega">{SETTING_FIELDS_HINT_REPO}</Typography>}
          />
          <TextField
            label={SETTING_WORKFLOWID}
            aria-label={SETTING_WORKFLOWID}
            name="workflow_id"
            value={workflowId || SETTINGS_FIELDS_WORKFLOWID_PLACEHOLDER}
            disabled
            required
            HintMessage={<Typography variant="omega">{SETTING_FIELDS_HINT_WORKFLOWID}</Typography>}
          />
          <TextField
            label={SETTING_BRANCH}
            aria-label={SETTING_BRANCH}
            name="branch"
            value={branch || SETTINGS_FIELDS_BRANCH_PLACEHOLDER}
            disabled
            required
            HintMessage={<Typography variant="omega">{SETTING_FIELDS_HINT_BRANCH}</Typography>}
          />
          <Select
            label={SETTING_ROLES}
            name="roles"
            value={roles}
            multi
            withTags
            disabled
            required
            hint={
              <Typography variant="omega">
                {SETTING_FIELDS_HINT_ROLES}{' '}
                <Link
                  href="https://docs.strapi.io/user-docs/latest/users-roles-permissions/configuring-administrator-roles.html"
                  isExternal
                >
                  Details
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
