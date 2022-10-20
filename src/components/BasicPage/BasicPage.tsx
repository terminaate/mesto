import React, { FC, ReactNode } from 'react';
import cl from './BasicPage.module.scss';
import classNames from 'classnames';
import { motion, MotionProps } from 'framer-motion';

interface IBasicPage extends MotionProps {
  children: ReactNode;
  className?: string;
  exitAnim?: boolean;
}

const BasicPage: FC<IBasicPage> = ({ className, children, exitAnim = true, ...props }) => {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      initial={exitAnim ? { opacity: 0 } : {}}
      animate={{ opacity: 1 }}
      exit={exitAnim ? { opacity: 0 } : {}}
      className={classNames(className!, cl.basicPage)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default BasicPage;
