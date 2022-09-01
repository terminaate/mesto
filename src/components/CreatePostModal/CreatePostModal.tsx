import React, { FC, useState } from 'react';
import FileUploadModal from '@/components/FileUploadModal';
import Modal from '@/components/Modal';
import cl from './CreatePostModal.module.css';
import Input from '@/components/UI/Input';
import { useTranslation } from 'react-i18next';
import useInputState from '@/hooks/useInputState';
import Button from '@/components/UI/Button';
import { PostProps } from '@/types/Post';
import { createPost } from '@/store/reducers/user/userAPI';
import { useAppDispatch, useAppSelector } from '@/store';

interface ICreatePostModal {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostModal: FC<ICreatePostModal> = ({ modal, setModal }) => {
	const [postImage, setPostImage] = useState<string>('');
	const { t } = useTranslation('user');
	const [postTitle, onPostTitleChange] = useInputState('');
	const [postDesc, onPostDescChange] = useInputState('');
	const [postTitleError, setPostTitleError] = useState<string>('');
	const [postDescError, setPostDescError] = useState<string>('');
	const dispatch = useAppDispatch();
	const { id: userId } = useAppSelector(state => state.userSlice.user);

	const onHide = () => {
		setPostImage('');
	};

	const createNewPost = async () => {
		if (!postTitle) {
			return setPostTitleError(t('Enter post title!'));
		} else if (postTitle.length <= 2) {
			return setPostTitleError(t('Minimum post title length is 2!'));
		} else {
			setPostTitleError('');
		}

		if (postDesc && postDesc.length > 150) {
			return setPostDescError(t('Maximum post description length is 150!'));
		} else {
			setPostDescError('');
		}

		if (!postTitleError && !postDescError) {
			const postData: PostProps = { title: postTitle, image: postImage, userId };

			if (postDesc) {
				postData.description = postDesc;
			}

			dispatch(createPost(postData));
		}
	};

	return (
		<>
			{!postImage && <FileUploadModal setModal={setModal} modal={modal} setImage={setPostImage} />}
			{postImage && (
				<Modal className={cl.createPostModal} onHide={onHide} modal={modal} setModal={setModal}>
					<div className={cl.postImageContainer}>
						<img className={cl.postImage} src={postImage} alt='' />
					</div>
					<div className={cl.container}>
						<div className={cl.inputsContainer}>
							<div className={cl.inputContainer}>
								<Input placeholder={t('Post title') + '*'} value={postTitle} onChange={onPostTitleChange} />
								<div className={cl.errorContainer}>
									<span className={cl.error}>{postTitleError}</span>
								</div>
							</div>
							<div className={cl.inputContainer}>
								<Input placeholder={t('Post description')} value={postDesc} onChange={onPostDescChange} />
								<div className={cl.errorContainer}>
									<span className={cl.error}>{postDescError}</span>
								</div>
							</div>
						</div>
						<Button onClick={createNewPost}>{t('Create post')}</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default CreatePostModal;