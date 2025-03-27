import { Metadata } from 'next';
import { notFound } from 'next/navigation';
//import ProductHeader from '@/app/components/product/ProductHeader';
import ProductOverview from '@/app/components/product/ProductOverview';
import productService from '@/app/services/productService';
import ProductInformationNew from '@/app/components/product/ProductInformationNew';
import AddToCartPopup from '@/app/components/popups/AddToCartPopup';
import toast from 'react-hot-toast';
import { api } from '@/app/utils/api';

type Params = {
  id: string;
};

// Function to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const res = await productService.getProductDetail(params.id);
    if (!res || !res.data) {
      return {
        title: 'Product Not Found | Myhomeetal',
        description: 'The product you are looking for does not exist.',
      };
    }

    const product = res.data;
    return {
      title: `${product.productTitle} | Myhomeetal`,
      description: `${product.productTitle} - ${product.description}. Price: $${product.price}`,
      // Add more metadata as needed
    };
  } catch (error) {
    console.error('Error fetching product metadata:', error);
    return {
      title: 'Error | Myhomeetal',
      description: 'An error occurred while fetching product details.',
    };
  }
}

export default async function page({ params }: { params: Params }) {
  let data: any;
  let reviewData: any;

  try {
    const [res, reviewRes] = await Promise.allSettled([
      fetch(`${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}${api.PRODUCTS}${params.id}`, {
        next: { revalidate: 60 },
      }).then((response) => response.json()),

      fetch(`${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}${api.REVIEW}${params.id}`, {
        next: { revalidate: 60 },
      }).then((response) => response.json()),
    ]);

    if (!res) {
      console.log('ID not found');
      return notFound();
    }

    if (res.status === 'fulfilled') {
      data = res?.value;
    } else {
      console.error('Product detail fetch failed:', res.reason);
    }

    if (reviewRes.status === 'fulfilled') {
      reviewData = reviewRes?.value;
    } else {
      console.error('Review fetch failed:', reviewRes.reason);
    }

    //console.log(data);
    //console.log(reviewData);
  } catch (error) {
    console.error('Error fetching products:', error);

    if (error instanceof Error && (error.message.includes('Network Error') || error.message.includes('timeout'))) {
      console.error('Network error or timeout occurred:', error);
      toast.error('Network error or timeout occurred');
      return notFound(); // Adjust based on your application's needs
    }

    console.error('An unexpected error occurred:', error);
    toast.error('An unexpected error occurred');
    return notFound(); // Adjust based on your application's needs
  }

  return (
    <main className='relative min-h-[100vh]'>
      <section>
        <ProductOverview reviewData={reviewData} data={data} />
      </section>
      <section>
        <ProductInformationNew reviewData={reviewData} data={data} />
      </section>
      {/*<ProductHeader data={data} />*/}
      <AddToCartPopup data={data} />
    </main>
  );
}
