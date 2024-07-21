'use client';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import './image-gallery.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import Button from '../Button';

const ProductGallery = ({ images }: { images: string[] }) => {
  const galleryImages: ReactImageGalleryItem[] = images?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

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
    <div className='hidden pr-1 lg:block h-[500px]'>
      <ImageGallery
        items={galleryImages}
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
