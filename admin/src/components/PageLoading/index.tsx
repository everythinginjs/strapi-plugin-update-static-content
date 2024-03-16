import React from 'react';
import { Flex, Loader } from '@strapi/design-system';
import useFormattedLabel from '../../hooks/useFormattedLabel';

export default function PageLoading() {
  const LOADING_MESSAGE = useFormattedLabel('loadingMsg');

  return (
    <Flex justifyContent="center">
      <Loader>{LOADING_MESSAGE}</Loader>
    </Flex>
  );
}
