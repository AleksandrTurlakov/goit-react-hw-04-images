import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleDownEscape);

    return () => {
      document.removeEventListener('keydown', handleDownEscape);
    };
  });

  const handleDownEscape = e => {
    if (e.code === 'Escape') onClose();
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
