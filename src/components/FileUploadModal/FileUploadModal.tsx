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
  validateSize?: boolean;
  accept?: string;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
}

const FileUploadModal: FC<IFileUploadButton> = ({
                                                  setImage,
                                                  modal,
                                                  setModal,
                                                  validateSize = true,
                                                  accept = 'image/*',
                                                  minHeight = 640,
                                                  minWidth = 800,
                                                  maxHeight = 1080,
                                                  maxWidth = 1920,
                                                }) => {
  const [error, setError] = useState<string>('');
  const { t } = useTranslation('user');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file.size >= 5242880) {
      return setError(t('Max file size is 5 mb!'));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        if (validateSize) {
          if (image.width < minWidth && image.height < minHeight) {
            return setError(
              t('Min file resolution is {{size}}!', {
                replace: { size: `${minWidth}x${minHeight}` },
              }),
            );
          } else if (image.width > maxWidth && image.height > maxHeight) {
            return setError(
              t('Max file resolution is {{size}}!', {
                replace: { size: `${maxWidth}x${maxHeight}` },
              }),
            );
          }

          if (image.width < minWidth) {
            return setError(
              t('Min file width is {{size}}px!', {
                replace: { size: minWidth },
              }),
            );
          } else if (image.width > maxWidth) {
            console.log(image.width, maxWidth);
            return setError(
              t('Max file width is {{size}}px!', {
                replace: { size: maxWidth },
              }),
            );
          }

          if (image.height < minHeight) {
            return setError(
              t('Min file height is {{size}}px!', {
                replace: { size: minHeight },
              }),
            );
          } else if (image.height > maxHeight) {
            return setError(
              t('Max file height is {{size}}px!', {
                replace: { size: maxHeight },
              }),
            );
          }

          setError('');
        }

        setImage(reader.result as string);
      };
      image.src = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  return (
    <Modal modal={modal} setModal={setModal}>
      <div className={cl.container}>
        <input
          type='file'
          accept={accept}
          className={cl.fileUploadInput}
          onChange={onInputChange}
        />
        <FaDownload className={cl.fileUploadIcon} />
        <span className={cl.fileUploadPrompt}>
          {t('Drag and drop files, photos and videos')}
        </span>
        <Button className={cl.fileUploadButton}>{t('Select a file')}</Button>
        <div data-error={Boolean(error)} className={cl.errorContainer}>
          <span className={cl.error}>{error}</span>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
