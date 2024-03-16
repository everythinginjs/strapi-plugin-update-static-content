import React from 'react';
import { TextInput, Stack } from '@strapi/design-system';

type Props = React.ComponentProps<typeof TextInput> & {
  HintMessage: React.ReactNode;
};

export default function TextField({ HintMessage, ...other }: Props) {
  return (
    <Stack spacing={1.5}>
      <TextInput {...other} />
      {HintMessage}
    </Stack>
  );
}
