import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement('body');

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, imageSrc }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    ariaHideApp={false}
    overlayClassName={s.overlay}
    className={s.modal}
  >
    <div>
      <img src={imageSrc} alt="Modal" className={s.modalImage} />
    </div>
  </Modal>
);

export default ImageModal;

