import { ConfirmDialog as StrapiConfirmDialog, ConfirmDialogProps } from '@strapi/helper-plugin';

export function ConfirmDialog({
  iconRightButton,
  onToggleDialog,
  onConfirm,
  variantRightButton,
  ...props
}: ConfirmDialogProps) {
  return (
    <>
      <StrapiConfirmDialog      
        onToggleDialog={(e) => {
          if (e.target.id === 'confirm-delete') {
            return;
          }
          onToggleDialog();
        }}
        onConfirm={() => {
          onToggleDialog();
          onConfirm();
        }}
        {...props}
      />
    </>
  );
}
