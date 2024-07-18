import { notFound } from 'next/navigation';
import ProductHeader from '@/app/components/product/ProductHeader';
import ProductOverview from '@/app/components/product/ProductOverview';
import productService from '@/app/services/productService';
import ProductInformationNew from '@/app/components/product/ProductInformationNew';
import AddToCartPopup from '@/app/components/popups/AddToCartPopup';

type Params = {
  id: string;
};

export default async function page({ params }: { params: Params }) {
  let data: any;
  try {
    const res = await productService.getProductDetail(params.id);
    if (!res || !res.data) {
      console.log('id not found');
      return notFound();
    }
    data = res.data;
    console.log(data);
  } catch (error) {
    console.error('Error in ProductPage:', error);
    return notFound();
  }
  return (
    <main className='relative min-h-[100vh]'>
      <section>
        <ProductOverview data={data} />
      </section>
      <section>
        <ProductInformationNew data={data} />
      </section>

      {/*<ProductHeader data={data} />*/}
      <AddToCartPopup data={data}/>
    </main>
  );
}
