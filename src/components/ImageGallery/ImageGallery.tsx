import ImageCard from './ImageCard';
import s from './ImageGallery.module.css';

export interface ImageData {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

interface ImageGalleryProps {
  images: ImageData[];
  onImageClick: (imageSrc: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => (
  <ul className={s.ImageGallery}>
    {images.map(({ id, urls, alt_description }) => (
      <li className={s.PhotoCard} key={id}>
        <ImageCard
          src={urls.small}
          alt={alt_description ?? 'Image'}
          onClick={() => onImageClick(urls.regular)}
        />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
