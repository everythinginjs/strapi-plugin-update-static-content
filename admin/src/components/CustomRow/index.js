import React from 'react';
import { Tooltip, IconButton, IconButtonGroup, Tr, Td } from '@strapi/design-system';
import { differenceInMilliseconds, formatRelative } from 'date-fns';
import { Eye, ExternalLink } from '@strapi/icons';
import PropTypes from 'prop-types';
import Label from '../Label';

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
  async function logsHandler(id) {
    console.log(id);
    //TODO: handle downloading logs here
  }

  const result = differenceInMilliseconds(new Date(updated_at), new Date(run_started_at));
  const mins = Math.floor(result / 1000 / 60);
  const secs = (result / 1000) % 60;
  const creationDate = formatRelative(new Date(created_at), new Date());
  return (
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
              // disabled={disabledButton} //TODO: handle disabled button on clicked in order to not get multiple requests
              aria-label="logs"
              onClick={() => logsHandler(id)} //TODO: download logs on click
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
