'use client';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import './image-gallery.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import Button from '../Button';

const ProductGallery = () => {
  const images: ReactImageGalleryItem[] = [
    {
      original: '/images/product/samsung-galaxy.png',
      thumbnail: '/images/product/samsung-galaxy.png',
    },
    {
      original: '/images/product/samsung-galaxy.png',
      thumbnail: '/images/product/samsung-galaxy.png',
    },
    {
      original: '/images/product/samsung-galaxy.png',
      thumbnail: '/images/product/samsung-galaxy.png',
    },
    {
      original: '/images/product/samsung-galaxy.png',
      thumbnail: '/images/product/samsung-galaxy.png',
    },
    {
      original: '/images/product/samsung-galaxy.png',
      thumbnail: '/images/product/samsung-galaxy.png',
    },
  ];

  const renderLeftNav = (onClick: any, disabled: boolean) => (
    <Button
      onClick={onClick}
      disabled={disabled}
      className='image-gallery-icon image-gallery-left-nav'
    >
      <FaChevronLeft />
    </Button>
  );
  const renderRightNav = (onClick: any, disabled: boolean) => (
    <Button
      onClick={onClick}
      disabled={disabled}
      className='image-gallery-icon image-gallery-right-nav'
    >
      <FaChevronRight />
    </Button>
  );

  return (
    <div className='hidden pr-1 lg:block'>
      <ImageGallery
        items={images}
        thumbnailPosition='left'
        showPlayButton={false}
        showFullscreenButton={false}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        disableKeyDown
      />
    </div>
  );
};

export default ProductGallery;
