import React from 'react';

type Spec = {
  title: string;
  desc: string;
};

type SpecificationProps = {
  dataSpec: Spec[];
};

export default function Specification({ dataSpec }: SpecificationProps) {
  return (
    <div className='mb-5 rounded-[10px] border border-[#E4E7EC] lg:rounded-[20px]'>
      <div className='flex h-[55px] items-center rounded-tl-[10px] rounded-tr-[10px] bg-primary px-2 lg:h-[80px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:px-5'>
        <h2 className='font-clashmd text-xs text-white lg:text-base'>
          SPECIFICATIONS
        </h2>
      </div>
      <div className='px-2 py-[38px] text-xs text-black lg:px-5 lg:text-base'>
        <ul>
          {dataSpec?.map((item) => (
            <li key={item?.title}>
              <span>{item?.title}</span>
              <span>{item?.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
