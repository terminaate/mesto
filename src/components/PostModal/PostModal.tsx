import React, { FC } from 'react';
import { PostProps } from '@/types/Post';
import Modal from '@/components/Modal';
import cl from "./PostModal.module.css";

interface IPostModal {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	data: PostProps;
}

const PostModal: FC<IPostModal> = ({modal, setModal, data}) => {
	return (
		<Modal modal={modal} setModal={setModal}>
			{data.title}
		</Modal>
	);
};

export default PostModal;