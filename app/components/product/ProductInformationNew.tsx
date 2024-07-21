import ClientOnly from '../ClientOnly';
import KeyFeature from './KeyFeature';
import ProductDetails from './ProductDetails';
import { Review } from './Review';
import SelectLocation from './SelectLocation';
import Specification from './Specification';


type Spec = {
  title: string;
  desc: string;
};

type KeyFeatureProps = {
  feature: string;
};

type DataProps = {
  description: string;
  KeyFeatures: KeyFeatureProps[];
  Specification: Spec[];
};

type ProductInformationNewProps = {
  data: DataProps;
};

export default function ProductInformationNew({ data }: ProductInformationNewProps) {
  return (
    <ClientOnly>
      {data && (
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
      )}
    </ClientOnly>
  );
}
