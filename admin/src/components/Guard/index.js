import React from 'react';
import { EmptyPermissions, ArrowRight } from '@strapi/icons';
import { EmptyStateLayout, LinkButton } from '@strapi/design-system';
import PropTypes from 'prop-types';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginId from '../../../../utils/pluginId';

const ICON_SIZE = 100;
const PLUGIN = `${pluginId}.plugin`;

export default function Guard({ errors, children }) {
  if (errors?.message === 'ACCESS_DENIED' && errors?.type === 'ROLES_AND_PERMISSIONS') {
    const PERMISSION_DENIED_MESSGAE = useFormattedLabel(`${pluginId}.guard`);

    return (
      <EmptyStateLayout
        content={PERMISSION_DENIED_MESSGAE}
        icon={<EmptyPermissions width={ICON_SIZE} height={ICON_SIZE} />}
      />
    );
  }

  if (errors.message === 'MISSING_CONFIG') {
    const MISSING_CONFIG = useFormattedLabel(`${PLUGIN}.missingConfig.message`);
    const MISSING_CONFIG_BTN = useFormattedLabel(`${PLUGIN}.missingConfig.button`);
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
