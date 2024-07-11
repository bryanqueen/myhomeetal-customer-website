import ClientOnly from '../ClientOnly';
import KeyFeature from './KeyFeature';
import ProductDetails from './ProductDetails';
import { Review } from './Review';
import SelectLocation from './SelectLocation';
import Specification from './Specification';

export default function ProductInformationNew({ data }: any) {
  return (
    <ClientOnly>
      <div className='mt-[150px] flex gap-5 px-[3%]'>
        <div className='w-full lg:basis-[65%]'>
          <ProductDetails dataDesc={data?.description} />
          <KeyFeature dataFeature={data?.KeyFeatures} />
          <Specification dataSpec={data?.Specification} />
          <Review />
        </div>
        <div className='hidden lg:block lg:basis-[35%]'>
          <SelectLocation />
        </div>
      </div>
    </ClientOnly>
  );
}
