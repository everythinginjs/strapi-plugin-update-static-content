import { BaseHeaderLayout, Link, Stack, Typography } from '@strapi/design-system';
import { CheckPagePermissions, useFetchClient } from '@strapi/helper-plugin';
import PageWrapper from '../../components/PageWrapper';
import useFetch from '../../hooks/useFetch';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';
import Config from '../../../../types/Config';
import ConfigsTable from '../../components/ConfigsTable';

export default function ProtectedPage() {
  return (
    <CheckPagePermissions permissions={pluginPermissions.settings}>
        <SettingPage />
    </CheckPagePermissions>
  );
}

const SettingPage = () => {
  // Hooks
  const [data, isLoading] = useFetch<Config>(`/${pluginId}/config`);
  const { branch, githubToken, githubAccount, repo, workflow } = data;
  const { post } = useFetchClient();

  // Translations
  const PAGE_TITLE = useFormattedLabel('settings.pagetitle');
  const HEADER_TITLE = useFormattedLabel('settings.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('settings.headers.subtitle');

  const setConfig = (data: Config) => {
    post(`/${pluginId}/config`, data);
  };

  return (
    <PageWrapper
      isLoading={isLoading}
      baseHeaderLayout={<BaseHeaderLayout title={HEADER_TITLE} subtitle={HEADER_SUBTITLE} />}
      pageTitle={PAGE_TITLE}
    >
      <ConfigsTable />
    </PageWrapper>
  );
};
