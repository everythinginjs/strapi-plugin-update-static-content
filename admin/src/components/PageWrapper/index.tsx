import React from 'react';
import { Box } from '@strapi/design-system';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import PageLoading from '../PageLoading';

const PADDING_X = 10;
const PADDING_Y = 2;

type Props = {
  children: React.ReactNode;
  baseHeaderLayout: JSX.Element;
  pageTitle: string;
  isLoading: boolean;
};

export default function PageWrapper({ children, baseHeaderLayout, pageTitle, isLoading }: Props) {
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
