import React, { FC, useState } from 'react';
import Modal from '@/components/Modal';
import AvatarFileConfirm from './AvatarFileConfirm';
import FileUploadModal from '@/components/FileUploadModal';

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
		<>
			{!image && <FileUploadModal modal={modal} setModal={setModal} setImage={setImage} />}
			{image && (
				<Modal modal={modal} onHide={onHide} setModal={setModal}>
					<AvatarFileConfirm setImage={setImage} image={image} setModal={setModal} />
				</Modal>
			)}
		</>
	);
};

export default ChangeAvatarModal;