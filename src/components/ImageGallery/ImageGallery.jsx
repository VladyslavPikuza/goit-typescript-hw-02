import PropTypes from 'prop-types';
import ImageCard from './ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={s.ImageGallery}>
    {images.map(({ id, urls, alt_description }) => (
      <li className={s.PhotoCard} key={id}>
        <ImageCard
          src={urls.small}
          alt={alt_description}
          onClick={() => onImageClick(urls.regular)}
        />
      </li>
    ))}
  </ul>
);


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  })).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;

