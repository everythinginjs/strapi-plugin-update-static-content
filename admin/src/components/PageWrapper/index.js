import React from 'react';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import { Box, Flex, Loader } from '@strapi/design-system';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import PropTypes from 'prop-types';

const PADDING_X = 10;
const PADDING_Y = 2;

function PageLoading() {
  const LOADING_MESSAGE = useFormattedLabel('loadingMsg');
  return (
    <Flex justifyContent="center">
      <Loader>{LOADING_MESSAGE}</Loader>
    </Flex>
  );
}

export default function PageWrapper({ children, baseHeaderLayout, pageTitle, isLoading }) {
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

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  baseHeaderLayout: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
