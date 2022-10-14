import React, { FC, HTMLAttributes, ReactNode } from 'react';
import cl from './BasicPage.module.css';
import classNames from 'classnames';

interface IBasicPage extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const BasicPage: FC<IBasicPage> = ({ className, children, ...props }) => {
  return (
    <div className={classNames(className!, cl.basicPage)} {...props}>
      {children}
    </div>
  );
};

export default BasicPage;