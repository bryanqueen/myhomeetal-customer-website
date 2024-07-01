import Newsletter from '@/app/components/Newsletter';
import ProductHeader from '@/app/components/product/ProductHeader';
import ProductInformation from '@/app/components/product/ProductInformation';
import ProductOverview from '@/app/components/product/ProductOverview';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';

type Params = {
  id: string;
};

export default async function page({ params }: { params: Params }) {
  let data;
  try {
    const res = await productService.getProductDetail(params.id);
    if (!res || !res.data) {
      return notFound();
    }
    data = res.data;
    console.log(data);
  } catch (error) {
    console.error('Error in ProductPage:', error);
    return notFound();
  }
  return (
    <div>
      <ProductOverview data={data} />
      <div className='lg:-mt-32'>
        <ProductHeader data={data} />
        <ProductInformation />
        <div className='lg:mx-5'></div>
      </div>
      <Newsletter />
    </div>
  );
}
