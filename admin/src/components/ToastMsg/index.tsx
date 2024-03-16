import React from 'react';
import { Alert } from '@strapi/design-system/Alert';

const stickyStyle = {
  position: 'fixed',
  top: 24,
  left: 'calc(50%)',
  transform: 'translateX(-50%)',
  zIndex: 10,
};

type Props = {
  variant: 'danger' | 'success';
  title: string;
  message: string;
  action?: React.ReactNode;
  closeToastHandler: () => void;
};

export default function ToastMessage({
  variant,
  title,
  message,
  action,
  closeToastHandler,
}: Props) {
  return (
    <Alert
      variant={variant}
      title={title}
      action={action}
      style={stickyStyle}
      onClose={closeToastHandler}
      closeLabel="close alert"
    >
      {message}
    </Alert>
  );
}
