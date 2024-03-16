import React, { useState } from 'react';
import { Tooltip, IconButton, IconButtonGroup, Tr, Td } from '@strapi/design-system';
import { differenceInMilliseconds, formatRelative } from 'date-fns';
import { Eye, ExternalLink } from '@strapi/icons';
import Label from '../Label';
import pluginId from '../../pluginId';
import { useFetchClient } from '@strapi/helper-plugin';

type Props = {
  id: number;
  conclusion: 'success' | 'failure';
  name: string;
  run_number: number;
  run_started_at: string;
  html_url: string;
  updated_at: string;
  created_at: string;
};

export default function CustomRow({
  id,
  conclusion,
  name,
  run_number,
  run_started_at,
  html_url,
  updated_at,
  created_at,
}: Props) {
  const { get } = useFetchClient();
  const isThereAConclusion = Boolean(conclusion);
  const [disabledLogsButton, setDisabledLogsButton] = useState(isThereAConclusion ? false : true);
  const msDiffResult = differenceInMilliseconds(new Date(updated_at), new Date(run_started_at));
  const mins = Math.floor(msDiffResult / 1000 / 60);
  const secs = (msDiffResult / 1000) % 60;
  const creationDate = formatRelative(new Date(created_at), new Date());

  async function logsHandler(id: number) {
    setDisabledLogsButton(true);
    try {
      let logsUrl = await get(`/${pluginId}/github-actions-jobs-log`, {
        params: {
          jobId: id,
        },
      });
      window.open(`${logsUrl.data}`, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      setDisabledLogsButton(false);
    }
  }

  return (
    <Tr aria-rowindex={id}>
      <Td>{run_number}</Td>
      <Td>{name}</Td>
      <Td>{conclusion ? Label(conclusion) : '-'}</Td>
      <Td>{creationDate}</Td>
      {!isThereAConclusion ? <Td>in progress</Td> : <Td>{`${mins ? mins + 'm' : ''} ${secs}s`}</Td>}
      <Td>
        <IconButtonGroup>
          <Tooltip description="logs">
            <IconButton
              disabled={disabledLogsButton}
              aria-label="logs"
              onClick={() => logsHandler(id)}
              icon={<Eye />}
            />
          </Tooltip>
          <Tooltip description="view more">
            <a href={html_url} target="_blank" rel="noreferrer">
              <IconButton aria-label="view more" icon={<ExternalLink />} />
            </a>
          </Tooltip>
        </IconButtonGroup>
      </Td>
    </Tr>
  );
}
