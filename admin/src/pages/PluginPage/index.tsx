import {
  BaseHeaderLayout,
  Button,
  Flex,
  Popover,
  Layout,
  Link,
  LinkButton,
  Table,
  Tbody,
  TextButton,
  Th,
  Thead,
  Tr,
  Typography,
  VisuallyHidden,
  Box,
} from '@strapi/design-system';
import { CheckPagePermissions, useFetchClient } from '@strapi/helper-plugin';
import { ArrowLeft, Check, More, Plus, Refresh } from '@strapi/icons';
import React, { useRef, useState } from 'react';
import Config from '../../../../types/Config';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import CustomRow from '../../components/CustomRow';
import PageLoading from '../../components/PageLoading';
import PageWrapper from '../../components/PageWrapper';
import ToastMsg from '../../components/ToastMsg';
import useFetch from '../../hooks/useFetch';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';
import { Pagination } from '../../components/Pagination';

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
  total_count?: number;
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
  const [workflows, isWorkflowsFetching, handleRefetchWorkflows] = useFetch<Config[]>(
    `/${pluginId}/config`
  );

  const [page, setPage] = useState(1);

  const [selectedWorkflow, setSelectedWorkflow] = useState<number>();
  const [data, isLoading, handleRefetch] = useFetch<Data>(
    `/${pluginId}/github-actions-history/${selectedWorkflow || '0'}?page=${page}`
  );

  const maxPerPage = 20;
  const numberOfItems = data.total_count || 0;

  function handleSetPage(page: number) {
    setPage(page);
    handleRefetch();
  }

  // Translations
  const TITLE = useFormattedLabel('plugin.title');
  const HEADER_TITLE = useFormattedLabel('plugin.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('plugin.headers.subtitle');
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

  const [isConfirmOneDialogOpen, setIsConfirmOneDialogOpen] = useState<boolean>(false);
  const [isConfirmAllDialogOpen, setIsConfirmAllDialogOpen] = useState<boolean>(false);

  // Callbacks

  const handleSelectWorkflow = (workflowId: number) => {
    setPage(1);
    setSelectedWorkflow(workflowId);
    handleRefetch();
  };

  async function triggerAllGithubActions() {
    await post(`/${pluginId}/github-actions-trigger/all`);
    handleRefetch();
  }

  function toggleConfirmOneDialog() {
    setIsConfirmOneDialogOpen((prev) => !prev);
  }

  function toggleConfirmAllDialog() {
    setIsConfirmAllDialogOpen((prev) => !prev);
  }

  // Callbacks

  async function triggerAllGithubActions() {
    try {
      await post(`/${pluginId}/github-actions-trigger/all`);
      handleRefetch();
    } catch (error: any) {
      console.error(error);
      console.error("coucou");
      setToastMsg({
        variant: 'danger',
        title: TOAST_FAILURE_UNKNOWN_TITLE,
        message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
      });
      setToastToggle(true);
      return;
    }
  }

  async function triggerGithubActions() {
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

  function Actions() {
    const PRIMARY_ACTION_BUTTON = useFormattedLabel('plugin.buttons.primary');
    const TRIGGER_ALL_WORKFLOWS_BUTTON = useFormattedLabel('plugin.buttons.triggerAllWorkflows');

    const CONFIRM_MSG = useFormattedLabel('confirm.message');

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const PopoverButton = useRef<HTMLButtonElement>(null);

    function HandleTogglePopover() {
      setIsPopoverOpen((prev) => !prev);
    }

    return (
      <Flex gap={3}>
        <Button
          onClick={() => {
            handleRefetch();
            setToastToggle(false);
          }}
          variant="secondary"
          loading={isLoading}
          startIcon={<Refresh />}
        >
          {REFRESH_BUTTON}
        </Button>
        <ConfirmDialog
          bodyText={{
            id: 'confirm.message',
            defaultMessage: CONFIRM_MSG,
          }}
          title={{
            id: 'confirm.title',
            defaultMessage: 'Are you sure?',
          }}
          isOpen={isConfirmOneDialogOpen}
          onToggleDialog={toggleConfirmOneDialog}
          onConfirm={triggerGithubActions}
          variantRightButton={'success-light'}
          iconRightButton={<Check />}
        />
        <Flex background="buttonPrimary600" hasRadius ref={PopoverButton}>
          <Button
            onClick={toggleConfirmOneDialog}
            variant="default"
            loading={loadingTriggerButton}
            startIcon={<Plus />}
          >
            {PRIMARY_ACTION_BUTTON}
          </Button>
          <Flex height="15px" width="1px" background="primary500"></Flex>
          <Button label={useFormattedLabel('button.seeMore')} onClick={HandleTogglePopover}>
            <More />
          </Button>
        </Flex>
        {isPopoverOpen && (
          <Popover as={Flex} source={PopoverButton} onDismiss={HandleTogglePopover} padding={1}>
            <Button variant="ghost" onClick={toggleConfirmAllDialog}>
              {TRIGGER_ALL_WORKFLOWS_BUTTON}
            </Button>
          </Popover>
        )}
        <ConfirmDialog
          bodyText={{
            id: 'confirm.message',
            defaultMessage: CONFIRM_MSG,
          }}
          title={{
            id: 'confirm.title',
            defaultMessage: 'Are you sure?',
          }}
          isOpen={isConfirmAllDialogOpen}
          onToggleDialog={toggleConfirmAllDialog}
          onConfirm={triggerAllGithubActions}
          variantRightButton={'success-light'}
          iconRightButton={<Check />}
        />
      </Flex>
    );
  }

  return (
    <Layout>
      <PageWrapper
        isLoading={isWorkflowsFetching}
        baseHeaderLayout={
          <BaseHeaderLayout
            title={HEADER_TITLE}
            subtitle={HEADER_SUBTITLE}
            navigationAction={
              <Link to="/" startIcon={<ArrowLeft />}>
                {BACK_BUTTON}
              </Link>
            }
            primaryAction={<Actions />}
          />
        }
        pageTitle={TITLE}
      >
        {toastToggle && <ToastMsg {...toastMsg} closeToastHandler={() => setToastToggle(false)} />}
        <Flex gap={3} alignItems="start" width="100%" overflowX="auto" direction="column">
          <Flex
            gap={3}
            background="neutral0"
            shadow="tableShadow"
            hasRadius
            border="1px solid"
            padding={4}
            alignItems="start"
            overflowX="auto"
          >
            {!isWorkflowsFetching &&
              workflows.map((workflow, index) => {
                if (!selectedWorkflow) {
                  setSelectedWorkflow(workflows[0].id ?? index);
                }
                return (
                  <Button
                    onClick={() => handleSelectWorkflow(workflow.id ?? index)}
                    variant={selectedWorkflow === workflow.id ? 'primary' : 'ghost'}
                    size="L"
                    loading={isWorkflowsFetching}
                    width="100%"
                    key={workflow.id ?? index}
                  >
                    <p
                      style={{
                        width: '100%',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {workflow.workflow}
                    </p>
                  </Button>
                );
              })}
            <LinkButton to={`/settings/${pluginId}`} variant="ghost" size="L">
              <Plus />
            </LinkButton>
          </Flex>
          <Box width="100%">
            {isLoading || !data.workflow_runs ? (
              <Flex
                width="100%"
                justifyContent="center"
                alignItems="center"
                paddingTop="5em"
                paddingBottom="5em"
              >
                <PageLoading />
              </Flex>
            ) : (
              <>
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
                    {data.workflow_runs.map(
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
              <Flex marginTop={3}direction="column" alignItems="end" width="100%">
                <Pagination
                  page={page}
                  setPage={handleSetPage}
                  numberOfItems={numberOfItems}
                  maxPerPage={maxPerPage}
                />
              </Flex>
              </>
            )}
          </Box>
        </Flex>
      </PageWrapper>
    </Layout>
  );
}
