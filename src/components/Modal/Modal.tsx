import React, { FC, ReactNode } from 'react';
import cl from './Modal.module.css';
import useClassNames from '@/hooks/useClassNames';

interface IModal {
	modal: boolean;
	setModal?: React.Dispatch<React.SetStateAction<boolean>>;
	onHide?: () => void;
	className?: string;
	children: ReactNode;
}

const Modal: FC<IModal> = ({
																 modal,
																 setModal,
																 onHide,
																 className,
																 children
															 }) => {

	const closeModal = () => {
		if (onHide && setModal) {
			setModal(false);
			return setTimeout(onHide, 400);
		}

		if (setModal) {
			return setModal(false);
		}

		if (onHide) {
			return setTimeout(onHide, 400);
		}
	};

	const classNames = useClassNames([className!, cl.modalContent]);

	return (
		<div onClick={closeModal} data-visible={modal} className={cl.modalScreen}>
			<div onClick={e => e.stopPropagation()} className={classNames}>
				{children}
			</div>
		</div>
	);
};

export default Modal;