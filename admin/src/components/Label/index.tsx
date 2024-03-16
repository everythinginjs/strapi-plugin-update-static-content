import React from 'react';
import { Badge } from '@strapi/design-system';

export default function Label(status: 'success' | 'failure') {
  const isSuccess = status === 'success';
  const isFailure = status === 'failure';

  const BadgeStyles = {
    textColor: 'neutral100',
    backgroundColor: isSuccess ? 'success500' : isFailure ? 'danger500' : 'neutral800',
  };

  return <Badge {...BadgeStyles}>{status}</Badge>;
}
