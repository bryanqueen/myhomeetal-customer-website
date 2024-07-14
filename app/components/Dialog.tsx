'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { CloseCircle } from 'iconsax-react';

const MyDialog = ({
  trigger,
  content,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-[2000] bg-black/20 data-[state=open]:animate-overlayShow' />
        <Dialog.Content className='fixed left-[50%] top-[50%] z-[2000] max-h-[85vh] w-[90vw] max-w-fit translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-2xl bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow'>
          {content}
          <Dialog.Close asChild>
            
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MyDialog;
