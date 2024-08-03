'use  client';
import KeyFeature from './KeyFeature';
import ProductDetails from './ProductDetails';
import { Review } from './Review';
import SelectLocation from './SelectLocation';
import Specification from './Specification';

type Spec = {
  title: string;
  desc: string;
};

type DataProps = {
  description: string;
  keyFeatures: string[];
  Specification: Spec[];
};

type ProductInformationNewProps = {
  data: DataProps;
};

export default function ProductInformationNew({
  data,
}: ProductInformationNewProps) {
  return (
    <div>
      {data && (
        <div className='mt-[150px] flex gap-5 px-[3%]'>
          <div className='w-full lg:basis-[65%]'>
            <ProductDetails dataDesc={data?.description} />
            <KeyFeature dataFeature={data?.keyFeatures} />
            <Specification dataSpec={data?.Specification} />
            <Review />
          </div>
          <div className='hidden lg:block lg:basis-[35%]'>
            <SelectLocation />
          </div>
        </div>
      )}
    </div>
  );
}
