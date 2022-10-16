import React, { FC, ReactNode } from 'react';
import cl from './Button.module.scss';
import classNames from 'classnames';

interface IButton extends React.ButtonHTMLAttributes<any> {
  className?: string;
  children: ReactNode;
}

const Button: FC<IButton> = ({ className, children, ...props }) => {
  return (
    <button className={classNames(className!, cl.button)} {...props}>
      {children}
    </button>
  );
};

export default Button;
