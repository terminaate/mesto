import React, { FC, ReactNode, useEffect, useRef } from 'react';
import cl from './ContextMenu.module.css';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useLocation } from 'react-router-dom';

interface IContextMenu {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

const ContextMenu: FC<IContextMenu> = ({ children, setState, state }) => {
  const contextMenuRef = useRef(null);
  const location = useLocation();
  const oldState = useRef<boolean>(state);

  useEffect(() => {
    oldState.current = state;
  }, [state]);

  useEffect(() => {
    setState(oldState.current);
  }, [location.pathname]);

  const hidePopup = () => {
    setState(false);
    oldState.current = false;
  };

  useOutsideClick(contextMenuRef, hidePopup);

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
