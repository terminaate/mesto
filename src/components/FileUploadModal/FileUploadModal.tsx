import React, { ChangeEvent, FC } from 'react';
import Modal from '@/components/Modal';
import cl from './FileUploadModal.module.css';
import { FaDownload } from 'react-icons/fa';
import Button from '@/components/UI/Button';

interface IFileUploadButton {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	setImage: React.Dispatch<React.SetStateAction<string>>;
}

const FileUploadModal: FC<IFileUploadButton> = ({ setImage, modal, setModal }) => {

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
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
				<span className={cl.fileUploadPrompt}>Перетаскивайте файлы, фотографии и видео</span>
				<Button className={cl.fileUploadButton}>Выберите файл</Button>
			</div>
		</Modal>
	);
};

export default FileUploadModal;