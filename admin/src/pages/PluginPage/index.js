import React, { useState, useEffect } from 'react';
import pluginId from '../../../../utils/pluginId';
import {
  BaseHeaderLayout,
  LinkButton,
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
import { ArrowLeft, Plus, Earth, Refresh } from '@strapi/icons';
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

const PluginPage = () => {
  const PLUGIN_PAGE_TITLE = useFormattedLabel(`${PLUGIN}.title`);
  const PLUGIN_PAGE_HEADER_TITLE = useFormattedLabel(`${PLUGIN}.headers.title`);
  const PLUGIN_PAGE_HEADER_SUBTITLE = useFormattedLabel(`${PLUGIN}.headers.subtitle`);
  const PLUGIN_PAGE_SECONDARY_ACTION_BUTTON = useFormattedLabel(`${PLUGIN}.buttons.secondary`);
  const PLUGIN_PAGE_PRIMARY_ACTION_BUTTON = useFormattedLabel(`${PLUGIN}.buttons.primary`);
  const [loadingTriggerButton, setLoadingTriggerButton] = useState(false);
  const [toastMsg, setToastMsg] = useState({});
  const [toastToggle, setToastToggle] = useState(false);
  // const [updateHistoryTable, setUpdateHistoryTable] = useState(false); //TODO

  const { errors, fetchedData, isLoading } = useFetchData({
    url: `/${pluginId}/github-actions-history`,
    method: 'GET',
  });

  useEffect(() => {}, [toastToggle]);

  async function triggerGithubActions() {
    try {
      setLoadingTriggerButton(true);
      const res = await axios(`/${pluginId}/github-actions-trigger`, {
        method: 'POST',
      });
      console.log(res);
      setToastMsg({
        variant: 'success',
        title: 'Successfully Triggered',
        message: 'Your workflow_dispatch event already started to progress.',
        action: (
          <TextButton
            endIcon={<Refresh />}
            onClick={() => {
              // setUpdateHistoryTable(true); //TODO
              setToastToggle(false);
            }}
          >
            Check it out
          </TextButton>
        ),
      });
      setToastToggle(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTriggerButton(false);
      setToastToggle(false);
    }
  }

  function closeToastHandler() {
    setToastMsg(false);
  }

  return (
    <>
      <PageWrapper
        isLoading={isLoading}
        baseHeaderLayout={
          <BaseHeaderLayout
            title={PLUGIN_PAGE_HEADER_TITLE}
            subtitle={PLUGIN_PAGE_HEADER_SUBTITLE}
            navigationAction={
              <Link to="/" startIcon={<ArrowLeft />}>
                Back
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
                {PLUGIN_PAGE_PRIMARY_ACTION_BUTTON}
              </Button>
            }
            secondaryAction={
              <LinkButton href="https://vahoora.com" variant="secondary" startIcon={<Earth />}>
                {PLUGIN_PAGE_SECONDARY_ACTION_BUTTON}
              </LinkButton>
            }
          />
        }
        pageTitle={PLUGIN_PAGE_TITLE}
      >
        {toastToggle && <ToastMsg {...toastMsg} closeToastHandler={closeToastHandler} />}
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
                  status,
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
                      key={id}
                      id={id}
                      conclusion={conclusion}
                      status={status}
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
};

export default PluginPage;
