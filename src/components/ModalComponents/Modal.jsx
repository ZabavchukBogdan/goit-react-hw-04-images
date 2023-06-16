import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export function Modal({ modalImgURL, tagsImg, onClose }) {
  useEffect(() => {
    //Закриття на "esc"
    const onKeydown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    //Вішаємо слухача подій при відкривання модалки та "відключаємо" scroll
    window.addEventListener('keydown', onKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      //Знімакємо слухача подій при закритті модалки та "вмикаємо" scroll
      window.removeEventListener('keydown', onKeydown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  //Закриття при клікі на Backdrop
  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>
        <img src={modalImgURL} alt={tagsImg} />
      </ModalWindow>
    </Overlay>
  );
}