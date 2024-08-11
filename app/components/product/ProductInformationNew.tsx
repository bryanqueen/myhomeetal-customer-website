'use  client';
import KeyFeature from './KeyFeature';
import ProductDetails from './ProductDetails';
import { Review } from './Review';
import SelectLocation from './SelectLocation';

type DataProps = {
  description: string;
  keyFeatures: string[];
};

type ProductInformationNewProps = {
  data: any;
  reviewData: any
};

export default function ProductInformationNew({
  data, reviewData
}: ProductInformationNewProps) {
  return (
    <div>
      {data && (
        <div className='mt-[150px] flex gap-5 px-[3%]'>
          <div className='w-full lg:basis-[65%]'>
            <ProductDetails dataDesc={data?.description} />
            <KeyFeature dataFeature={data?.keyFeatures} />

            {/**Specification */}
            <div className='mb-5 rounded-[10px] border border-[#E4E7EC] lg:rounded-[20px]'>
              <div className='flex h-[55px] items-center rounded-tl-[10px] rounded-tr-[10px] bg-primary px-2 lg:h-[80px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:px-5'>
                <h2 className='font-clashmd text-xs text-white lg:text-base'>
                  SPECIFICATIONS
                </h2>
              </div>
              <div className='px-2 py-[38px] text-xs text-black lg:px-5 lg:text-base'>
                <ul className='grid gap-2'>
                  {data.size && (
                    <li className='text-xs lg:text-base'>
                      <span className='font-clashmd mr-2'>Size ( L x W x  H cm):</span> {data.size}
                    </li>
                  )}
                  {data.weight && (
                    <li className='text-xs lg:text-base'>
                      <span className='font-clashmd mr-2'>Weight (Kg):</span> {data.weight}
                    </li>
                  )}
                  {data.color && (
                    <li className='text-xs lg:text-base'>
                      <span className='font-clashmd mr-2'>Color:</span> {data.color}
                    </li>
                  )}
                  {data.mainMaterial && (
                    <li className='text-xs lg:text-base'>
                      <span className='font-clashmd mr-2'>Main Material:</span> {data.mainMaterial}
                    </li>
                  )}

                  {data.modelNumber && (
                    <li className='text-xs lg:text-base'>
                      <span className='font-clashmd mr-2'>Model:</span> {data.modelNumber}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <Review review={reviewData} />
          </div>
          <div className='hidden lg:block lg:basis-[35%]'>
            <SelectLocation />
          </div>
        </div>
      )}
    </div>
  );
}
