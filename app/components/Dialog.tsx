'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { CloseCircle } from 'iconsax-react';

const MyDialog = ({
  trigger,
  content,
  open, // New prop to control the open state
  onOpenChange, // Callback to handle open state change
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  open?: boolean; // Optional prop to control dialog state
  onOpenChange?: (open: boolean) => void; // Callback to handle open state
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-[2000] bg-black/20 data-[state=open]:animate-overlayShow' />
        <Dialog.Content className='fixed left-[50%] top-[50%] z-[2000] max-h-fit w-[95vw] lg:max-w-fit translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-2xl py-7 px-[2%] lg:px-5 bg-white lg:p-[25px] focus:outline-none data-[state=open]:animate-contentShow'>
          {content}
          <Dialog.Close asChild>
            
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MyDialog;
