import React, { FC, ReactNode } from 'react';
import cl from './Modal.module.css';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

interface IModal {
  modal: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onHide?: () => void;
  className?: string;
  children: ReactNode;
}

const Modal: FC<IModal> = ({
                             modal,
                             setModal,
                             onHide,
                             className,
                             children,
                           }) => {

  const closeModal = () => {
    if (onHide && setModal) {
      setModal(false);
      return setTimeout(onHide, 400);
    }

    if (setModal) {
      return setModal(false);
    }

    if (onHide) {
      return setTimeout(onHide, 400);
    }
  };

  return createPortal(
    <div onMouseDown={closeModal} data-visible={modal} className={cl.modalScreen}>
      <div onMouseDown={e => e.stopPropagation()} className={classNames(className!, cl.modalContent)}>
        {children}
      </div>
    </div>
    , document.body);
};

export default Modal;