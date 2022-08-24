import useClassNames from '@/hooks/useClassNames';
import React, { FC, InputHTMLAttributes } from 'react';
import cl from './Input.module.css';


type InputProps = InputHTMLAttributes<any> & {
	className?: string;
}

const Input: FC<InputProps> = ({ className, ...props }) => {
	return (
		<input
			{...props}
			className={useClassNames([cl.Input, className])} />
	);
};

export default Input;