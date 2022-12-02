import React from 'react';
import { EmptyPermissions } from '@strapi/icons';
import { EmptyStateLayout } from '@strapi/design-system';
import PropTypes from 'prop-types';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginId from '../../../../utils/pluginId';

const ICON_SIZE = 100;

export default function Guard({ errors, children }) {
  if (errors?.message === 'ACCESS_DENIED' && errors?.type === 'ROLES_AND_PERMISSIONS') {
    const PERMITTED_ROLES = useFormattedLabel(`${pluginId}.permissionMsg`);

    return (
      <EmptyStateLayout
        content={PERMITTED_ROLES}
        icon={<EmptyPermissions width={ICON_SIZE} height={ICON_SIZE} />}
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
