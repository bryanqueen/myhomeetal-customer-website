'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import ProductAccordion from './ProductAccordion';
import ProductTabs from './ProductTabs';
import SpecificationTable from './SpecificationTable';
import ProductReviews from './ProductReviews';

// Individual Components

const ProductDetails = ({ dataDesc }: { dataDesc: string }) => {
  return (
    <div>
      <p>{dataDesc}</p>
    </div>
  );
};

const ProductSpecs = () => (
  <div>
    <SpecificationTable title='DIMENSION/WEIGHTS' />
    <SpecificationTable title='DIMENSION/WEIGHTS' />
    <SpecificationTable title='DIMENSION/WEIGHTS' />
    <SpecificationTable title='DIMENSION/WEIGHTS' />
  </div>
);



{/*const ProductInformation = ({ data }: any) => {
  return (
    <div className='my-5 px-5 lg:my-10 2xl:px-20'>
      <div className='lg:hidden'>
        <ProductAccordion
          details={<ProductDetails dataDesc={data.description} />}
          specifications={<ProductSpecs />}
          reviews={<ProductReviewInfo />}
        />
      </div>
      <div className='hidden lg:block'>
        <ProductTabs
          details={<ProductDetails dataDesc={data.description} />}
          specifications={<ProductSpecs />}
          reviews={<ProductReviewInfo />}
        />
      </div>
    </div>
  );
};

export default ProductInformation; */}
