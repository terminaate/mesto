import React, { FC, ReactNode } from 'react';
import cl from './Modal.module.css';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
    <AnimatePresence>
      {modal && (
        <motion.div
          transition={{duration: 0.4}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={closeModal}
          className={cl.modalScreen}
        >
          <motion.div
            onMouseDown={(e) => e.stopPropagation()}
            className={classNames(className!, cl.modalContent)}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
