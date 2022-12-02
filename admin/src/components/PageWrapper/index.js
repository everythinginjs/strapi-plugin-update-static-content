import React from 'react';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import { Box, Flex, Loader } from '@strapi/design-system';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginId from '../../../../utils/pluginId';

const PageLoading = () => {
  const LOADING_MESSAGE = useFormattedLabel(`${pluginId}.loadingMsg`);
  return (
    <Flex justifyContent="center">
      <Loader>{LOADING_MESSAGE}</Loader>
    </Flex>
  );
};

export default function PageWrapper({ children, baseHeaderLayout, pageTitle, isLoading }) {
  const PADDING_X = 10;
  const PADDING_Y = 2;

  return (
    <>
      <SettingsPageTitle name={pageTitle} />
      {baseHeaderLayout}
      <Box
        paddingRight={PADDING_X}
        paddingLeft={PADDING_X}
        paddingTop={PADDING_Y}
        paddingBottom={PADDING_Y}
      >
        {isLoading ? <PageLoading /> : <>{children}</>}
      </Box>
    </>
  );
}
