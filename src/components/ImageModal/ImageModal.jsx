import Modal from 'react-modal';
import s from './ImageModal.module.css'; 

Modal.setAppElement('body');  

const ImageModal = ({ isOpen, onRequestClose, imageSrc }) => (
  <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose} 
    ariaHideApp={false}  ю
    overlayClassName={s.overlay}  
    className={s.modal}           
  >
    <div>
      <img 
        src={imageSrc} 
        alt="Modal Image" 
        className={s.modalImage} 
      />
    </div>
  </Modal>
);

export default ImageModal;

