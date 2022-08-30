import { motion, MotionProps } from 'framer-motion';
import React, { FC, ReactNode } from 'react';
import useClasses from '@/hooks/useClassNames';
import cl from './BasicPage.module.css';

interface IBasicPage extends MotionProps {
	children: ReactNode;
	className?: string;
}

const BasicPage: FC<IBasicPage> = ({ className, children, ...props }) => {
	const classNames = useClasses(className!, cl.basicPage);

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
								exit={{ opacity: 0 }} className={classNames} {...props}>
			{children}
		</motion.div>
	);
};

export default BasicPage;