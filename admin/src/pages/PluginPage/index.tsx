import {
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
} from '@strapi/design-system';
import { CheckPagePermissions, useFetchClient } from '@strapi/helper-plugin';
import { ArrowLeft, Plus, Refresh } from '@strapi/icons';
import React, { useState } from 'react';
import CustomRow from '../../components/CustomRow';
import PageWrapper from '../../components/PageWrapper';
import ToastMsg from '../../components/ToastMsg';
import useFetch from '../../hooks/useFetch';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';

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
  const [data, isLoading, handleRefetch] = useFetch<Data>(`/${pluginId}/github-actions-history`);

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
      await post(`/${pluginId}/github-actions-trigger`);
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
            <Link
              isExternal
              href="https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow"
            >
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
      isLoading={isLoading}
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
            <Button
              onClick={triggerGithubActions}
              variant="default"
              size="L"
              loading={loadingTriggerButton}
              startIcon={<Plus />}
            >
              {PRIMARY_ACTION_BUTTON}
            </Button>
          }
        />
      }
      pageTitle={TITLE}
    >
      {toastToggle && <ToastMsg {...toastMsg} closeToastHandler={() => setToastToggle(false)} />}
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
    </PageWrapper>
  );
}
