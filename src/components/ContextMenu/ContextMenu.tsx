import React, { FC, ReactNode, useEffect, useRef } from 'react';
import cl from './ContextMenu.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useLocation } from 'react-router-dom';

interface IContextMenu {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  closeEvent?: 'mousedown' | 'mouseup' | 'click';
  children?: ReactNode;
}

const ContextMenu: FC<IContextMenu> = ({
  children,
  setState,
  state,
  closeEvent = 'mousedown',
}) => {
  const contextMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setState(false);
  }, [location.pathname]);

  const hidePopup = () => {
    setState(false);
  };

  useOutsideClick(contextMenuRef, hidePopup, closeEvent);

  return (
    <div
      ref={contextMenuRef}
      onClick={hidePopup}
      data-active={state}
      className={cl.contextMenuContainer}
    >
      {children}
    </div>
  );
};

export default ContextMenu;
