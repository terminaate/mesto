import useClassNames from '@/hooks/useClassNames';
import React, { FC, InputHTMLAttributes } from 'react';
import cl from './Input.module.css';

type InputProps = InputHTMLAttributes<any> & {
	className?: string;
}

const Input: FC<InputProps> = ({ className, children, ...props }) => {
	return (
		<div className={cl.inputContainer}>
			<input {...props} className={useClassNames([cl.Input, className])} />
			<div>
				{children}
			</div>
		</div>
	);
};

export default Input;