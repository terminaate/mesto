import useClassNames from '@/hooks/useClassNames';
import React, { FC, ReactNode } from 'react';
import cl from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<any> & {
	className?: string;
	children: ReactNode;
}

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
	return (
		<button className={useClassNames([className, cl.button])} {...props}>
			{children}
		</button>
	);
};

export default Button;