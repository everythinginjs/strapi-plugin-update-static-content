import React from 'react';
import { Alert } from '@strapi/design-system/Alert';
import PropTypes from 'prop-types';

const stickyStyle = {
  position: 'fixed',
  top: 24,
  left: 'calc(50%)',
  transform: 'translateX(-50%)',
  zIndex: 10,
};

export default function ToastMessage({ variant, title, message, action, closeToastHandler }) {
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

ToastMessage.propTypes = {
  variant: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.node,
  closeToastHandler: PropTypes.func.isRequired,
};
