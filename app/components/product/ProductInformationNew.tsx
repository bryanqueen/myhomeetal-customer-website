import KeyFeature from "./KeyFeature";
import ProductDetails from "./ProductDetails";
import { Review } from "./Review";
import SelectLocation from "./SelectLocation";
import Specification from "./Specification";

export default function ProductInformationNew({ data }: any) {
  return (
    <div className='mt-[150px] px-[3%] flex gap-5'>
      <div className="lg:basis-[65%] w-full">
        <ProductDetails dataDesc={data?.description} />
        <KeyFeature dataFeature={data?.KeyFeatures}/>
        <Specification dataSpec={data?.Specification} />
        <Review />
      </div>
      <div className="hidden lg:block lg:basis-[35%]">
        <SelectLocation />
      </div>
    </div>
  );
}
