import React from 'react';
import { EmptyPermissions, ArrowRight } from '@strapi/icons';
import { EmptyStateLayout, LinkButton } from '@strapi/design-system';
import PropTypes from 'prop-types';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginId from '../../../../utils/pluginId';

const ICON_SIZE = 100;

export default function Guard({ errors, children }) {
  if (errors?.message === 'ACCESS_DENIED' && errors?.type === 'ROLES_AND_PERMISSIONS') {
    const PERMISSION_DENIED_MESSAGE = useFormattedLabel('permission.guard');

    return (
      <EmptyStateLayout
        content={PERMISSION_DENIED_MESSAGE}
        icon={<EmptyPermissions width={ICON_SIZE} height={ICON_SIZE} />}
      />
    );
  }

  if (errors.message === 'MISSING_CONFIG') {
    const MISSING_CONFIG = useFormattedLabel('plugin.missingConfig.message');
    const MISSING_CONFIG_BTN = useFormattedLabel('plugin.missingConfig.button');
    return (
      <EmptyStateLayout
        content={`${MISSING_CONFIG}${errors.type}`}
        icon={<EmptyPermissions width={ICON_SIZE} height={ICON_SIZE} />}
        action={
          <LinkButton to={`/settings/${pluginId}`} variant="default" endIcon={<ArrowRight />}>
            {MISSING_CONFIG_BTN}
          </LinkButton>
        }
      />
    );
  }

  return <>{children}</>;
}

Guard.propTypes = {
  errors: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }),
  children: PropTypes.node,
};
