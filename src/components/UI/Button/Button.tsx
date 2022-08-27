import useClassNames from '@/hooks/useClassNames';
import React, { FC, ReactNode } from 'react';
import cl from './Button.module.css';

interface IButton extends React.ButtonHTMLAttributes<any> {
	className?: string;
	children: ReactNode;
}

const Button: FC<IButton> = ({ className, children, ...props }) => {
	return (
		<button className={useClassNames([className, cl.button])} {...props}>
			{children}
		</button>
	);
};

export default Button;