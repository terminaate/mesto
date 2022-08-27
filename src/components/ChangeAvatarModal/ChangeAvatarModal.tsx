import React, { FC, useState } from 'react';
import Modal from '@/components/Modal';
import AvatarFileUpload from './AvatarFileUpload';
import AvatarFileConfirm from './AvatarFileConfirm';

interface IChangeAvatarModal {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeAvatarModal: FC<IChangeAvatarModal> = ({ modal, setModal }) => {
	const [image, setImage] = useState<string>('');

	const onHide = () => {
		setImage('');
	};

	return (
		<Modal modal={modal} onHide={onHide} setModal={setModal}>
			{image ? <AvatarFileConfirm setImage={setImage} image={image} setModal={setModal} /> :
				<AvatarFileUpload setImage={setImage} />}
		</Modal>
	);
};

export default ChangeAvatarModal;