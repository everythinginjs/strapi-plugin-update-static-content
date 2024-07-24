import { BaseHeaderLayout, Link, Stack, Typography } from '@strapi/design-system';
import { CheckPagePermissions } from '@strapi/helper-plugin';
import PageWrapper from '../../components/PageWrapper';
import TextField from '../../components/TextField';
import useFetch from '../../hooks/useFetch';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';
import Config from '../../../../types/Config';

export default function ProtectedPage(){
  return (
    <CheckPagePermissions permissions={pluginPermissions.settings}>
      <SettingPage />
    </CheckPagePermissions>
  );
} 


const SettingPage = () => {
  // Hooks
  const [data, isLoading] = useFetch<Config>(`/${pluginId}/config`);
  const { branch, githubToken, githubAccount, repo, workflow } = data;

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
      <Stack spacing={6}>
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
        <TextField
          type="text"
          label={OWNER}
          aria-label={OWNER}
          name="githubAccount"
          value={githubAccount || PLACEHOLDER_OWNER}
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
          value={workflow || PLACEHOLDER_WORKFLOWID}
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

