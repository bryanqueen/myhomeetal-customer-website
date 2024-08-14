'use client';

export default function KeyFeature({ dataFeature }: any) {
  const filteredKeyFeature = dataFeature.filter((feature) => feature.trim() !== '');
  return (
    <div className='mb-5 rounded-[10px] border border-[#E4E7EC] lg:rounded-[20px]'>
      <div className='flex h-[55px] items-center rounded-tl-[10px] rounded-tr-[10px] bg-primary px-2 lg:h-[80px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:px-5'>
        <h2 className='font-clashmd text-xs text-white lg:text-base'>
          KEY FEATURES
        </h2>
      </div>
      {filteredKeyFeature && (
        <div className='py-[38px] px-7 lg:px-10 text-xs text-black lg:text-base'>
          <ul className="list-disc">{filteredKeyFeature?.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      )}

    </div>
  );
}
