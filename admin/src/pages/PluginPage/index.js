import React, { useState } from 'react';
import pluginPermissions from '../../permissions';
import {
  BaseHeaderLayout,
  Link,
  Typography,
  TextButton,
  Button,
  Table,
  Thead,
  Tbody,
  VisuallyHidden,
  Tr,
  Th,
} from '@strapi/design-system';
import { CheckPagePermissions } from '@strapi/helper-plugin';
import { ArrowLeft, Plus, Refresh } from '@strapi/icons';
import pluginId from '../../../../utils/pluginId';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import Guard from '../../components/Guard';
import PageWrapper from '../../components/PageWrapper';
import useFetchData from '../../hooks/useFetchData';
import CustomRow from '../../components/CustomRow';
import axios from '../../utils/axiosInstance';
import ToastMsg from '../../components/ToastMsg';

const PLUGIN = `${pluginId}.plugin`;
const THEAD_ITEMS = [
  'Run Number',
  'Workflow Name',
  'Status',
  'Creation Date',
  'Duration',
  <VisuallyHidden key="actions" />,
];

const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.trigger}>
    <PluginPage />
  </CheckPagePermissions>
);

const PluginPage = () => {
  // Hooks
  const [loadingTriggerButton, setLoadingTriggerButton] = useState(false);
  const [toastMsg, setToastMsg] = useState({});
  const [toastToggle, setToastToggle] = useState(false);

  const { errors, fetchedData, isLoading, setRefetch } = useFetchData({
    url: `/${pluginId}/github-actions-history`,
    method: 'GET',
  });

  // Translations
  const TITLE = useFormattedLabel(`${PLUGIN}.title`);
  const HEADER_TITLE = useFormattedLabel(`${PLUGIN}.headers.title`);
  const HEADER_SUBTITLE = useFormattedLabel(`${PLUGIN}.headers.subtitle`);
  const PRIMARY_ACTION_BUTTON = useFormattedLabel(`${PLUGIN}.buttons.primary`);
  const TOAST_SUCCESS_TITLE = useFormattedLabel(`${PLUGIN}.toast.success.title`);
  const TOAST_SUCCESS_DESCRIPTION = useFormattedLabel(`${PLUGIN}.toast.success.description`);
  const TOAST_FAILURE_UNKNOWN_TITLE = useFormattedLabel(`${PLUGIN}.toast.failure.unknown.title`);
  const TOAST_FAILURE_UNKNOWN_DESCRIPTION = useFormattedLabel(
    `${PLUGIN}.toast.failure.unknown.description`
  );
  const TOAST_FAILURE_UNPROCESSABLE_TITLE = useFormattedLabel(
    `${PLUGIN}.toast.failure.unprocessableEntity.title`
  );
  const TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION = useFormattedLabel(
    `${PLUGIN}.toast.failure.unprocessableEntity.description`
  );
  const TOAST_PERMISSION_DENIED_MSG = useFormattedLabel(`${pluginId}.permission.toast.message`);
  const TOAST_PERMISSION_DENIED_TITLE = useFormattedLabel(`${pluginId}.permission.toast.title`);
  const SEE_MORE_BUTTON = useFormattedLabel(`${pluginId}.button.seeMore`);
  const REFRESH_BUTTON = useFormattedLabel(`${pluginId}.button.refresh`);
  const Back_BUTTON = useFormattedLabel(`${pluginId}.button.back`);

  // Callbacks
  async function triggerGithubActions() {
    try {
      setLoadingTriggerButton(true);
      await axios(`/${pluginId}/github-actions-trigger`, {
        method: 'POST',
      });
      setToastMsg({
        variant: 'success',
        title: TOAST_SUCCESS_TITLE,
        message: TOAST_SUCCESS_DESCRIPTION,
        action: (
          <TextButton
            endIcon={<Refresh />}
            onClick={() => {
              setRefetch({});
              setToastToggle(false);
            }}
          >
            {REFRESH_BUTTON}
          </TextButton>
        ),
      });
      setToastToggle(true);
    } catch (error) {
      console.error(error);
      if (
        error.response.data.error?.status === 422 &&
        error.response.data.error?.name === 'UnprocessableEntityError'
      ) {
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
      } else if (
        error.response.data.error?.status === 403 &&
        error.response.data.error?.name === 'PolicyError'
      ) {
        setToastMsg({
          variant: 'danger',
          title: TOAST_PERMISSION_DENIED_TITLE,
          message: TOAST_PERMISSION_DENIED_MSG,
        });
      } else {
        setToastMsg({
          variant: 'danger',
          title: TOAST_FAILURE_UNKNOWN_TITLE,
          message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
        });
      }
      setToastToggle(true);
    } finally {
      setLoadingTriggerButton(false);
    }
  }

  const isAccessDenied =
    errors.message === 'ACCESS_DENIED' && errors.type === 'ROLES_AND_PERMISSIONS';
  return (
    <>
      <PageWrapper
        isLoading={isLoading}
        baseHeaderLayout={
          <BaseHeaderLayout
            title={HEADER_TITLE}
            subtitle={HEADER_SUBTITLE}
            navigationAction={
              <Link to="/" startIcon={<ArrowLeft />}>
                {Back_BUTTON}
              </Link>
            }
            primaryAction={
              <Button
                onClick={triggerGithubActions}
                variant="default"
                size="L"
                disabled={isAccessDenied ? true : false}
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
        <Guard errors={errors}>
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
              {fetchedData?.workflow_runs?.map(
                ({
                  id,
                  conclusion,
                  name,
                  run_number,
                  run_started_at,
                  html_url,
                  updated_at,
                  disabled,
                  created_at,
                }) => {
                  return (
                    <CustomRow
                      toastMsg={toastMsg}
                      setToastMsg={setToastMsg}
                      toastToggle={toastToggle}
                      setToastToggle={setToastToggle}
                      key={id}
                      id={id}
                      conclusion={conclusion}
                      name={name}
                      run_number={run_number}
                      run_started_at={run_started_at}
                      html_url={html_url}
                      updated_at={updated_at}
                      disabled={disabled}
                      created_at={created_at}
                    />
                  );
                }
              )}
            </Tbody>
          </Table>
        </Guard>
      </PageWrapper>
    </>
  );
}

export default ProtectedPage;
