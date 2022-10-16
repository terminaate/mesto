import React, { FC, ReactNode } from 'react';
import cl from './BasicPage.module.css';
import classNames from 'classnames';
import { motion, MotionProps } from 'framer-motion';

interface IBasicPage extends MotionProps {
  children: ReactNode;
  className?: string;
}

const BasicPage: FC<IBasicPage> = ({ className, children, ...props }) => {
  return (
    <motion.div transition={{duration: 0.5}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={classNames(className!, cl.basicPage)} {...props}>
      <span></span>
      {children}
    </motion.div>
  );
};

export default BasicPage;
