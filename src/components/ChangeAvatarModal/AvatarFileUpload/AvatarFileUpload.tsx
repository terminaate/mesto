import React, { ChangeEvent, FC } from 'react';
import cl from './AvatarFileUpload.module.css';
import { FaDownload } from 'react-icons/all';
import Button from '@/components/UI/Button';

interface IAvatarFileUpload {
	setImage: React.Dispatch<React.SetStateAction<string>>;
}

const AvatarFileUpload: FC<IAvatarFileUpload> = ({ setImage }) => {

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
		<div className={cl.container}>
			<input type='file' className={cl.fileUploadInput} onChange={onInputChange} />
			<FaDownload className={cl.fileUploadIcon} />
			<span className={cl.fileUploadPrompt}>Перетаскивайте файлы, фотографии и видео</span>
			<Button className={cl.fileUploadButton}>Выберите файл</Button>
		</div>
	);
};

export default AvatarFileUpload;