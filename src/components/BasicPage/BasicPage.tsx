import { motion } from 'framer-motion';
import React, { FC, HTMLAttributes, ReactNode } from 'react';
import useClasses from '@/hooks/useClassNames';
import cl from './BasicPage.module.css';
import Header from '@/components/Header/Header';

interface IBasicPage extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

const BasicPage: FC<IBasicPage> = ({ className, children, ...props }) => {
	const classNames = useClasses(className!, cl.basicPage);

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}>
			<Header />
			<div className={classNames} {...props}>
				{children}
			</div>
		</motion.div>
	);
};

export default BasicPage;