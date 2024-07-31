import {
  Flex,
  BaseHeaderLayout,
  Button,
  Link,
  Table,
  Tbody,
  TextButton,
  Th,
  Thead,
  Tr,
  Typography,
  VisuallyHidden,
  Layout,
} from '@strapi/design-system';
import { CheckPagePermissions, useFetchClient } from '@strapi/helper-plugin';
import { ArrowLeft, Layer, Plus, Refresh } from '@strapi/icons';
import React, { useState } from 'react';
import CustomRow from '../../components/CustomRow';
import PageWrapper from '../../components/PageWrapper';
import ToastMsg from '../../components/ToastMsg';
import useFetch from '../../hooks/useFetch';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';
import Config from '../../../../types/Config';
import PageLoading from '../../components/PageLoading';

const THEAD_ITEMS = [
  'Run Number',
  'Workflow Name',
  'Status',
  'Creation Date',
  'Duration',
  <VisuallyHidden key="actions" />,
];

export default function ProtectedPage() {
  return (
    <CheckPagePermissions permissions={pluginPermissions.trigger}>
      <PluginPage />
    </CheckPagePermissions>
  );
}

type Data = {
  workflow_runs?: {
    id: number;
    conclusion: 'success' | 'failure';
    name: string;
    run_number: number;
    run_started_at: string;
    html_url: string;
    updated_at: string;
    disabled: string;
    created_at: string;
  }[];
};

type Toast = {
  variant: 'danger' | 'success';
  title: string;
  message: string;
  action?: React.ReactNode;
};

function PluginPage() {
  // Hooks
  const [loadingTriggerButton, setLoadingTriggerButton] = useState(false);
  const [toastMsg, setToastMsg] = useState<Toast>({} as Toast);
  const [toastToggle, setToastToggle] = useState(false);
  const { post } = useFetchClient();
  const [workflows, fetchingWorkflows, handleRefetchWorkflows] = useFetch<Config[]>(
    `/${pluginId}/config`
  );

  const [selectedWorkflow, setSelectedWorkflow] = useState<number>();
  const [data, isLoading, handleRefetch] = useFetch<Data>(
    `/${pluginId}/github-actions-history/${selectedWorkflow || '0'}`
  );

  const handleSelectWorkflow = (workflowId: number) => {
    setSelectedWorkflow(workflowId);
    handleRefetch();
  };

  // Translations
  const TITLE = useFormattedLabel('plugin.title');
  const HEADER_TITLE = useFormattedLabel('plugin.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('plugin.headers.subtitle');
  const PRIMARY_ACTION_BUTTON = useFormattedLabel('plugin.buttons.primary');
  const TOAST_SUCCESS_TITLE = useFormattedLabel('plugin.toast.success.title');
  const TOAST_SUCCESS_DESCRIPTION = useFormattedLabel('plugin.toast.success.description');
  const TOAST_FAILURE_UNKNOWN_TITLE = useFormattedLabel('plugin.toast.failure.unknown.title');
  const TOAST_FAILURE_UNKNOWN_DESCRIPTION = useFormattedLabel(
    'plugin.toast.failure.unknown.description'
  );
  const TOAST_FAILURE_UNPROCESSABLE_TITLE = useFormattedLabel(
    'plugin.toast.failure.unprocessableEntity.title'
  );
  const TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION = useFormattedLabel(
    'plugin.toast.failure.unprocessableEntity.description'
  );
  const TOAST_PERMISSION_DENIED_MSG = useFormattedLabel('permission.toast.message');
  const TOAST_PERMISSION_DENIED_TITLE = useFormattedLabel('permission.toast.title');
  const SEE_MORE_BUTTON = useFormattedLabel('button.seeMore');
  const REFRESH_BUTTON = useFormattedLabel('button.refresh');
  const BACK_BUTTON = useFormattedLabel('button.back');
  const CONFIRM_MSG = useFormattedLabel('confirm.message');

  // Callbacks
  async function triggerGithubActions() {
    const isConfirmed = confirm(CONFIRM_MSG);

    if (!isConfirmed) return;

    try {
      setLoadingTriggerButton(true);
      await post(`/${pluginId}/github-actions-trigger/${selectedWorkflow || '0'}`);
      setToastMsg({
        variant: 'success',
        title: TOAST_SUCCESS_TITLE,
        message: TOAST_SUCCESS_DESCRIPTION,
        action: (
          <TextButton
            endIcon={<Refresh />}
            onClick={() => {
              handleRefetch();
              setToastToggle(false);
            }}
          >
            {REFRESH_BUTTON}
          </TextButton>
        ),
      });
      setToastToggle(true);
    } catch (error: any) {
      console.error(error);
      const { status, name } = error.response.data.error;

      if (status === 422 && name === 'UnprocessableEntityError') {
        setToastMsg({
          variant: 'danger',
          title: TOAST_FAILURE_UNPROCESSABLE_TITLE,
          message: TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION,
          action: (
            <Link href="https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow">
              {SEE_MORE_BUTTON}
            </Link>
          ),
        });
        return;
      }

      if (status === 403 && name === 'PolicyError') {
        setToastMsg({
          variant: 'danger',
          title: TOAST_PERMISSION_DENIED_TITLE,
          message: TOAST_PERMISSION_DENIED_MSG,
        });
        return;
      }

      setToastMsg({
        variant: 'danger',
        title: TOAST_FAILURE_UNKNOWN_TITLE,
        message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
      });
    } finally {
      setToastToggle(true);
      setLoadingTriggerButton(false);
    }
  }

  return (
    <PageWrapper
      isLoading={fetchingWorkflows}
      baseHeaderLayout={
        <BaseHeaderLayout
          title={HEADER_TITLE}
          subtitle={HEADER_SUBTITLE}
          navigationAction={
            <Link to="/" startIcon={<ArrowLeft />}>
              {BACK_BUTTON}
            </Link>
          }
          primaryAction={
            <Flex gap={3}>
              <Button
                onClick={() => {
                  handleRefetch();
                  setToastToggle(false);
                }}
                variant="secondary"
                size="L"
                loading={isLoading}
                startIcon={<Refresh />}
              >
                {REFRESH_BUTTON}
              </Button>
              <Button
                onClick={triggerGithubActions}
                variant="default"
                size="L"
                loading={loadingTriggerButton}
                startIcon={<Plus />}
              >
                {PRIMARY_ACTION_BUTTON}
              </Button>
            </Flex>
          }
        />
      }
      pageTitle={TITLE}
    >
      {toastToggle && <ToastMsg {...toastMsg} closeToastHandler={() => setToastToggle(false)} />}
      <Layout>
        <Flex gap={3} alignItems="start" width="100%" overflowX="auto">
          <Flex
            gap={3}
            direction="column"
            background="neutral0"
            shadow="tableShadow"
            hasRadius
            border="1px solid"
            minWidth="15em"
            width="15em"
            padding={4}
            alignItems="start"
          >
            <h1>Workflows</h1>
            <Flex direction="column" width="100%">
              {!fetchingWorkflows &&
                workflows.map((workflow, index) => {
                  if (!selectedWorkflow) {
                    setSelectedWorkflow(workflows[0].id ?? index);
                  }
                  return (
                    <Button
                      onClick={() => handleSelectWorkflow(workflow.id ?? index)}
                      variant={selectedWorkflow === workflow.id ? 'primary' : 'ghost'}
                      size="L"
                      loading={fetchingWorkflows}
                      width="100%"
                      key={workflow.id ?? index}
                    >
                      {workflow.workflow}
                    </Button>
                  );
                })}
            </Flex>
          </Flex>
          {isLoading ? (
            <Flex flex="1" justifyContent="center" alignItems="center">
              <PageLoading />
            </Flex>
          ) : (
              <Table colCount={6} rowCount={21}>
                <Thead>
                  <Tr>
                    {THEAD_ITEMS.map((title, i) => (
                      <Th key={i}>
                        <Typography variant="sigma">{title}</Typography>
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.workflow_runs?.map(
                    ({
                      id,
                      conclusion,
                      name,
                      run_number,
                      run_started_at,
                      html_url,
                      updated_at,
                      created_at,
                    }) => {
                      return (
                        <CustomRow
                          key={id}
                          id={id}
                          conclusion={conclusion}
                          name={name}
                          run_number={run_number}
                          run_started_at={run_started_at}
                          html_url={html_url}
                          updated_at={updated_at}
                          created_at={created_at}
                        />
                      );
                    }
                  )}
                </Tbody>
              </Table>
          )}
        </Flex>
        <Flex width="100vw">
        </Flex>
      </Layout>
    </PageWrapper>
  );
}
