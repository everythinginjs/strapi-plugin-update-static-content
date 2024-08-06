import { BaseHeaderLayout, Flex, Link, TextInput, Typography, Button } from '@strapi/design-system';
import { useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import { useFetchClient } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import { useHistory } from 'react-router-dom';
import { ArrowLeft } from '@strapi/icons';

export default function AddNewWorkflow() {
  const { goBack } = useHistory();
  const [workflow, setWorkflow] = useState('');
  const [branch, setBranch] = useState('');
  const [githubAccount, setGithubAccount] = useState('');
  const [repo, setRepo] = useState('');
  const [githubToken, setGithubToken] = useState('');

  const { post } = useFetchClient();

  const PAGE_TITLE = 'Add New Workflow';
  const HEADER_TITLE = 'Add New Workflow';
  const HEADER_SUBTITLE = 'Add a new workflow to update the static content';

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

  const BACK_BUTTON = useFormattedLabel('button.back');
  const SAVE_BUTTON = useFormattedLabel('button.save')

  return (
    <PageWrapper
      baseHeaderLayout={
        <BaseHeaderLayout
          title={HEADER_TITLE}
          subtitle={HEADER_SUBTITLE}
          navigationAction={
            <Link to={`/settings/${pluginId}`} startIcon={<ArrowLeft />}>
              {BACK_BUTTON}
            </Link>
          }
        />
      }
      pageTitle={PAGE_TITLE}
    >
      <form
        style={{ width: '100%' }}
        onSubmit={async (e) => {
          e.preventDefault();
          if (githubToken && githubAccount && repo && workflow && branch) {
            await post(`/${pluginId}/config`, {
              githubToken,
              githubAccount,
              repo,
              workflow,
              branch,
            });
            goBack();
          } else {
            console.error('Please fill all the fields');
          }
        }}
      >
        <Flex direction="column" gap={3} alignItems="normal">
          <TextInput
            type="text"
            label={GITHUB_TOKEN}
            aria-label={GITHUB_TOKEN}
            name="githubToken"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            placeholder={PLACEHOLDER_GITHUB_TOKEN}
            required
            autoComplete="hidden"
            HintMessage={
              <Typography variant="omega">
                {HINT_GITHUB_TOKEN}{' '}
                <Link
                  href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                >
                  {BUTTON_DETAILS}
                </Link>
              </Typography>
            }
          />
          <TextInput
            type="text"
            label={OWNER}
            aria-label={OWNER}
            name="githubAccount"
            value={githubAccount}
            onChange={(e) => setGithubAccount(e.target.value)}
            placeholder={PLACEHOLDER_OWNER}
            required
            HintMessage={<Typography variant="omega">{HINT_OWNER}</Typography>}
          />
          <TextInput
            type="text"
            label={REPO}
            aria-label={REPO}
            name="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder={PLACEHOLDER_REPO}
            required
            HintMessage={<Typography variant="omega">{HINT_REPO}</Typography>}
          />
          <TextInput
            type="text"
            label={BRANCH}
            aria-label={BRANCH}
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder={PLACEHOLDER_BRANCH}
            required
            HintMessage={<Typography variant="omega">{HINT_BRANCH}</Typography>}
          />
          <TextInput
            type="text"
            label={WORKFLOWID}
            aria-label={WORKFLOWID}
            name="workflow_id"
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            placeholder={PLACEHOLDER_WORKFLOWID}
            required
            HintMessage={<Typography variant="omega">{HINT_WORKFLOWID}</Typography>}
          />
        </Flex>

        <Button size="M" marginTop={4} type="submit">
          {SAVE_BUTTON}
        </Button>
      </form>
    </PageWrapper>
  );
}
