import React, { FC } from 'react';
import cl from './AvatarFileConfirm.module.css';
import backgroundImage from '@/utils/backgroundImage';
import Button from '@/components/UI/Button';
import { useAppDispatch } from '@/store';
import { editUser } from '@/store/reducers/user/userAPI';

interface IAvatarFileConfirm {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarFileConfirm: FC<IAvatarFileConfirm> = ({
                                                     image,
                                                     setImage,
                                                     setModal,
                                                   }) => {
  const dispatch = useAppDispatch();
  const uploadImage = () => {
    dispatch(editUser({ id: '@me', avatar: image }));
    setModal(false);
    setTimeout(() => setImage(''), 300);
  };

  return (
    <>
      <div className={cl.container}>
        <div className={cl.userAvatar} style={backgroundImage(image)} />
        <span className={cl.fileConfirmPrompt}>Вы уверены?</span>
      </div>
      <div className={cl.buttons}>
        <Button onClick={() => setImage('')}>Нет</Button>
        <Button onClick={uploadImage}>Да</Button>
      </div>
    </>
  );
};

export default AvatarFileConfirm;
