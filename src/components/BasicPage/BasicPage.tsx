import React, { FC, HTMLAttributes, ReactNode } from 'react';
import useClasses from '@/hooks/useClassNames';
import cl from './BasicPage.module.css';

interface IBasicPage extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

const BasicPage: FC<IBasicPage> = ({ className, children, ...props }) => {
	const classNames = useClasses(className!, cl.basicPage);

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export default BasicPage;