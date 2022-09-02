import React, { ChangeEvent, FC, useState } from 'react';
import Modal from '@/components/Modal';
import cl from './FileUploadModal.module.css';
import { FaDownload } from 'react-icons/fa';
import Button from '@/components/UI/Button';
import { useTranslation } from 'react-i18next';

interface IFileUploadButton {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	setImage: React.Dispatch<React.SetStateAction<string>>;
}

const FileUploadModal: FC<IFileUploadButton> = ({ setImage, modal, setModal }) => {
	const [error, setError] = useState<string>('');
	const { t } = useTranslation('user');

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		console.log(file);
		if (file.size >= 5242880) {
			return setError(t('Max file size is 5 mb!'));
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setImage(reader.result as string);
		};
		reader.onerror = (error) => {
			console.log('Error: ', error);
		};
	};

	return (
		<Modal modal={modal} setModal={setModal}>
			<div className={cl.container}>
				<input type='file' className={cl.fileUploadInput} onChange={onInputChange} />
				<FaDownload className={cl.fileUploadIcon} />
				<span className={cl.fileUploadPrompt}>{t('Drag and drop files, photos and videos')}</span>
				<Button className={cl.fileUploadButton}>{t('Select a file')}</Button>
				<div data-error={Boolean(error)} className={cl.errorContainer}>
					<span className={cl.error}>{error}</span>
				</div>
			</div>
		</Modal>
	);
};

export default FileUploadModal;