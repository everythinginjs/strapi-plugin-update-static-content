import { Button, Typography, ModalLayout, ModalFooter, ModalHeader } from '@strapi/design-system';
import { ReactNode, useState } from 'react';
import useFormattedLabel from '../../hooks/useFormattedLabel';

interface ConfirmModalProps {
  onConfirm: () => void;
  children: (onOpen: () => void) => ReactNode;
  title?: string;
  confirmMsg?: string;
  cancelMsg?: string;
}

export function ConfirmModal({ children, onConfirm, title, confirmMsg, cancelMsg }: ConfirmModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const MODAL_CONFIRM = useFormattedLabel('configModal.confirm');
  const MODAL_CANCEL = useFormattedLabel('configModal.cancel');

  const MODAL_TITLE = useFormattedLabel('configModal.title');
  return (
    <>
      {children(() => setIsOpen(true))}
      {isOpen && (
        <ModalLayout onClose={() => setIsOpen(false)} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" as="h2" id="title">
              {title || MODAL_TITLE}
            </Typography>
          </ModalHeader>
          <ModalFooter
            startActions={
              <Button variant="tertiary" onClick={() => setIsOpen(false)}>
                {cancelMsg || MODAL_CANCEL}
              </Button>
            }
            endActions={
              <Button variant="primary" onClick={onConfirm}>
                {confirmMsg || MODAL_CONFIRM}
              </Button>
            }
          />
        </ModalLayout>
      )}
    </>
  );
}
