import React, { FC, ReactNode } from 'react';
import cl from './Modal.module.css';
import useClassNames from '@/hooks/useClassNames';

type ModalProps = {
	visible: boolean;
	setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
	onHide?: () => void;
	className?: string;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({
																 visible,
																 setVisible,
																 onHide,
																 className,
																 children
															 }) => {

	const closeModal = () => {
		if (onHide && setVisible) {
			setVisible(false);
			return setTimeout(onHide, 400);
		}

		if (setVisible) {
			return setVisible(false);
		}

		if (onHide) {
			return setTimeout(onHide, 400);
		}
	};

	const classNames = useClassNames([className!, cl.modalContent]);

	return (
		<div onClick={closeModal} data-visible={visible} className={cl.modalScreen}>
			<div onClick={e => e.stopPropagation()} className={classNames}>
				{children}
			</div>
		</div>
	);
};

export default Modal;