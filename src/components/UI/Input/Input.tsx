import classNames from 'classnames';
import React, { FC, InputHTMLAttributes } from 'react';
import cl from './Input.module.scss';

interface IInput extends InputHTMLAttributes<any> {
  className?: string;
}

const Input: FC<IInput> = ({ className, children, ...props }) => {
  return (
    <div className={cl.inputContainer}>
      <input {...props} className={classNames(cl.input, className!)} />
      {children && <div>{children}</div>}
    </div>
  );
};

export default Input;
