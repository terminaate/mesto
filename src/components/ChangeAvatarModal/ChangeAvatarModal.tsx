import React, { FC, useState } from 'react';
import Modal from '@/components/Modal';
import AvatarFileConfirm from './AvatarFileConfirm';
import FileUploadModal from '@/components/FileUploadModal';
import ResizeImage from '@/components/ResizeImage';

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
			{!image && <FileUploadModal validateSize={false} modal={modal} setModal={setModal} setImage={setImage} />}
			{image && (
				<>
					<Modal modal={modal} onHide={onHide} setModal={setModal}>
						<ResizeImage image={image}/>
						{/*<AvatarFileConfirm setImage={setImage} image={image} setModal={setModal} />*/}
					</Modal>
				</>
			)}
		</>
	);
};

export default ChangeAvatarModal;