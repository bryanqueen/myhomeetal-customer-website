import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Category from '@components/category/CategoryGrid';
import ProductOverview from '@components/product/ProductOverview';
import ProductInformation from '@components/product/ProductInformation';
import CartHeader from '@/app/components/product/ProductHeader';
import Newsletter from '@/app/components/Newsletter';
import productService from '@/app/services/productService';

type Params = {
  id: string;
};

export default async function ProductPage({ params }: { params: Params }) {
  try {
    const res = await productService.getProductDetail(params.id);
    if (!res || !res.data) {
      return notFound();
    }
    const data = res.data;
    
    return (
      <main className=''>
        <h1>{data.productTitle}</h1>
        {/* Comment out other components temporarily */}
        {/* <ProductOverview data={data} /> */}
        {/* <div className='lg:-mt-32'>
          <CartHeader data={data} />
          <ProductInformation />
          <div className='lg:mx-5'>
          </div>
        </div>
        <Newsletter /> */}
      </main>
    );
  } catch (error) {
    console.error("Error in ProductPage:", error);
    return notFound();
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const res = await productService.getProductDetail(params.id).catch(() => notFound());

  if (!res || !res.data) {
    return notFound();
  }

  const product = res.data;

  return {
    title: `${product.productTitle} | Myhomeetal`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const res = await productService.getAllProducts();
  const products = res.data;

  return products.map((product: any) => ({
    id: product._id.toString(),
  }));
}
