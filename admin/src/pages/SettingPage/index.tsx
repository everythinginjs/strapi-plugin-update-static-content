import { BaseHeaderLayout } from '@strapi/design-system';
import { CheckPagePermissions, } from '@strapi/helper-plugin';
import PageWrapper from '../../components/PageWrapper';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import ConfigsTable from '../../components/ConfigsTable';

export default function ProtectedPage() {
  return (
    <CheckPagePermissions permissions={pluginPermissions.settings}>
        <SettingPage />
    </CheckPagePermissions>
  );
}

const SettingPage = () => {
  // Translations
  const PAGE_TITLE = useFormattedLabel('settings.pagetitle');
  const HEADER_TITLE = useFormattedLabel('settings.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('settings.headers.subtitle');

  return (
    <PageWrapper
      baseHeaderLayout={<BaseHeaderLayout title={HEADER_TITLE} subtitle={HEADER_SUBTITLE} />}
      pageTitle={PAGE_TITLE}
    >
      <ConfigsTable />
    </PageWrapper>
  );
};
