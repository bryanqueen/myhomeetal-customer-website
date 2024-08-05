import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductHeader from '@/app/components/product/ProductHeader';
import ProductOverview from '@/app/components/product/ProductOverview';
import productService from '@/app/services/productService';
import ProductInformationNew from '@/app/components/product/ProductInformationNew';
import AddToCartPopup from '@/app/components/popups/AddToCartPopup';
import toast from 'react-hot-toast';

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
  try {
    const res = await productService.getProductDetail(params.id);
    if (!res || !res?.data) {
      console.log('id not found');
      return notFound();
    }
    data = res?.data;
    console.log(data)
  } catch (error) {
    console.error('Error fetching products:', error);

    // Check if the error is a network error or a timeout
    if (
      error instanceof Error &&
      (error.message.includes('Network Error') ||
        error.message.includes('timeout'))
    ) {
      console.error('Network error or timeout occurred:', error);
    toast.error('Network error or timeout occurred');
      // Optionally, return a custom error page or message
      return notFound(); // You might want to handle it differently based on your application's needs
    }

    // Handle other types of errors
    console.error('An unexpected error occurred:', error);
    toast.error('An unexpected error occurred:', error);
    // Optionally, return a custom error page or message
    return notFound(); // Again, adjust based on your needs
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
      <AddToCartPopup data={data} />
    </main>
  );
}
