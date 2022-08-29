import useClassNames from '@/hooks/useClassNames';
import React, { FC, InputHTMLAttributes } from 'react';
import cl from './Input.module.css';

interface IInput extends InputHTMLAttributes<any> {
	className?: string;
}

const Input: FC<IInput> = ({ className, children, ...props }) => {
	return (
		<div className={cl.inputContainer}>
			<input {...props} className={useClassNames([cl.Input, className])} />
			{children && (
				<div>
					{children}
				</div>
			)}
		</div>
	);
};

export default Input;