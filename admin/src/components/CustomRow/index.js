import React, { useState } from 'react';
import { Tooltip, IconButton, IconButtonGroup, Tr, Td } from '@strapi/design-system';
import { differenceInMilliseconds, formatRelative } from 'date-fns';
import { Eye, ExternalLink } from '@strapi/icons';
import PropTypes from 'prop-types';
import Label from '../Label';
import pluginId from '../../../../utils/pluginId';
import axios from '../../utils/axiosInstance';
export default function CustomRow({
  id,
  conclusion,
  status,
  name,
  run_number,
  run_started_at,
  html_url,
  updated_at,
  created_at,
}) {
  const [disabledButton, setDisabledButton] = useState(false);
  const msDiffResult = differenceInMilliseconds(new Date(updated_at), new Date(run_started_at));
  const mins = Math.floor(msDiffResult / 1000 / 60);
  const secs = (msDiffResult / 1000) % 60;
  const creationDate = formatRelative(new Date(created_at), new Date());

  async function logsHandler(id) {
    setDisabledButton(true);
    try {
      let logsUrl = await axios({
        method: 'get',
        url: `/${pluginId}/github-actions-jobs-log`,
        params: {
          jobId: id,
        },
      });
      window.open(`${logsUrl.data}`, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      setDisabledButton(false);
    }
  }

  return (
    <>
      <Tr aria-rowindex={id}>
        <Td>{run_number}</Td>
        <Td>{name}</Td>
        <Td>{conclusion ? Label(conclusion) : '-'}</Td>
        <Td>{creationDate}</Td>
        {status === 'in_progress' ? (
          <Td>in progress</Td>
        ) : (
          <Td>{`${mins ? mins + 'm' : ''} ${secs}s`}</Td>
        )}
        <Td>
          <IconButtonGroup>
            <Tooltip description="logs">
              <IconButton
                disabled={disabledButton}
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
    </>
  );
}

CustomRow.propTypes = {
  id: PropTypes.number,
  conclusion: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string,
  run_number: PropTypes.number,
  run_started_at: PropTypes.string,
  html_url: PropTypes.string,
  updated_at: PropTypes.string,
  created_at: PropTypes.string,
};
