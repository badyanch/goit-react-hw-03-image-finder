import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import * as S from './ImageGallery.styled';

export const ImageGallery = forwardRef(({ images }, ref) => (
  <S.Gallery ref={ref}>
    {images.map(({ id, tags, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        descr={tags}
        imgUrl={webformatURL}
        largeImgURL={largeImageURL}
      />
    ))}
  </S.Gallery>
));

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
