import s from './ImageCard.module.css';

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => (
  <div>
    <img className={s.Img} src={src} alt={alt} onClick={onClick} />
  </div>
);

export default ImageCard;



