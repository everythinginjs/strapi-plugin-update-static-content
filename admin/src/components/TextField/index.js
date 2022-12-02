import React from 'react';
import { TextInput, Stack } from '@strapi/design-system';
import PropTypes from 'prop-types';

export default function TextField({ HintMessage, ...other }) {
  return (
    <Stack spacing={1.5}>
      <TextInput {...other} />
      {HintMessage}
    </Stack>
  );
}

TextField.propTypes = {
  HintMessage: PropTypes.node,
};
