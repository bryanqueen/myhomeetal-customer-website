'use client';

import { InputHTMLAttributes, useState } from 'react';

interface UploadDocumentProps extends InputHTMLAttributes<HTMLInputElement> {
  errorKey?: string;
  labelKey?: string;
}

export const DocumentInput = ({
  id,
  onChange,
  name,
  errorKey,
  labelKey,
  ...props
}: UploadDocumentProps) => {
  const [file, setFile] = useState<File>();

  const handleFile = (e: any) => {
    const file1 = e.target.files[0];
    setFile(file1);
    if (onChange) onChange(file1);
  };

  return (
    <div className='relative'>
      {labelKey && <span className='mb-3 pl-2 text-gray-700'>{labelKey}</span>}
      <input
        type='file'
        id={id}
        name={name}
        className='peer absolute h-0 overflow-hidden'
        // {...props}
        onChange={handleFile}
      />
      <label
        htmlFor={id}
        className='mt-1 flex items-center justify-between rounded-xl border-2 p-5 pr-10 peer-focus:border-primary'
      >
        <span className='text-gray-400'>
          {file ? 'Click to change file' : 'Browse to upload...'}
        </span>
        {DocumentIcon}
      </label>
      {errorKey && (
        <p className='my-2 text-xs text-red-500 first-letter:capitalize'>
          {errorKey}
        </p>
      )}
    </div>
  );
};

const DocumentIcon = (
  <svg
    width='21'
    height='17'
    viewBox='0 0 21 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M20.7555 7.72832C20.4367 7.19076 19.8727 6.86996 19.2469 6.86996H17.6848V3.87855C17.6848 3.15649 17.1012 2.56925 16.3842 2.56925H8.73713C8.72592 2.56925 8.71839 2.5659 8.71534 2.5639L7.34676 0.565667C7.10404 0.211414 6.70382 0 6.27603 0H1.30064C0.583351 0 0 0.58741 0 1.3093V15.6597C0 16.3986 0.59761 17 1.33237 17H16.8101C17.0513 17 17.2595 16.8546 17.3603 16.6436L20.8292 9.37163C21.0807 8.84461 21.053 8.23026 20.7555 7.72832ZM1.30064 1.28454H6.27603C6.31288 1.28454 6.33788 1.30144 6.34573 1.31297L7.71638 3.31405C7.94774 3.65191 8.32937 3.85379 8.73713 3.85379H16.3842C16.4271 3.85379 16.4489 3.87486 16.4543 3.8824V6.86996H5.31969C4.62916 6.86996 4.0011 7.27622 3.7196 7.90512L1.23047 13.4659V1.31314C1.23592 1.30561 1.25771 1.28454 1.30064 1.28454ZM19.7277 8.7991L16.4292 15.7152H1.58182L4.8344 8.44904C4.91323 8.27291 5.10837 8.1545 5.31969 8.1545H19.2469C19.4435 8.1545 19.6164 8.24799 19.7093 8.40455C19.7615 8.49269 19.8071 8.6327 19.7277 8.7991Z'
      fill='#292929'
    />
  </svg>
);

export default DocumentInput;
