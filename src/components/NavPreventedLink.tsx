import React, { FC, MouseEvent, ReactNode } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

interface INavPreventedLink extends NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavPreventedLink: FC<INavPreventedLink> = ({ to, children, ...props }) => {
  const location = useLocation();

  const onClick = (e: MouseEvent) => {
    if (location.pathname === to || location.pathname.endsWith(to)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <NavLink {...props} onClick={onClick} to={to}>
      {children}
    </NavLink>
  );
};

export default NavPreventedLink;