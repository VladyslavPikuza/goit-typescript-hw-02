import s from './ImageCard.module.css';

const ImageCard = ({ src, alt, onClick }) => (
  <div>
    <img 
      className={s.Img}
      src={src} 
      alt={alt} 
      onClick={onClick} 
    />
  </div>
);

export default ImageCard;



