import React, { FC, useEffect } from 'react';
import { PostProps } from '@/types/Post';
import Modal from '@/components/Modal';
import cl from './PostModal.module.css';
import { FaHeart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/store';
import { likePost } from '@/store/reducers/user/userAPI';
import UserService from '@/services/UserService';
import { useLocation } from 'react-router-dom';
import { UserProps } from '@/types/User';

interface IPostModal {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	post: PostProps;
	setPost: React.Dispatch<React.SetStateAction<PostProps>>;
	userData: UserProps;
	setUserData: React.Dispatch<React.SetStateAction<UserProps>>;
}

const PostModal: FC<IPostModal> = ({ modal, setModal, post, setPost, userData, setUserData }) => {
	if (Object.values(post).length <= 0) {
		return <></>;
	}

	const { user } = useAppSelector(state => state.userSlice);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const isSelfUserPost = post.userId === user.id && (location.pathname === `/users/${user.id}` || location.pathname === '/users/@me');

	const likeButtonHandler = async () => {
		if (isSelfUserPost) {
			dispatch(likePost(post.id));
		} else {
			const { data: newPost } = await UserService.likePost(post.id);
			const newPosts = [...userData.posts!];
			newPosts[newPosts.findIndex(p => p.id === newPost.id)] = newPost;
			setUserData({ ...userData, posts: newPosts });
		}
	};

	useEffect(() => {
		if (Object.values(userData).length > 0) {
			setPost(userData.posts?.find(p => p.id === post.id) as PostProps);
		}
	}, [userData.posts]);


	return (
		<Modal className={cl.postModal} modal={modal} setModal={setModal}>
			<div className={cl.postImageContainer}>
				<img src={post.image} alt={''} className={cl.postImage} />
			</div>
			<div className={cl.postInfoContainer}>
				<span className={cl.postTitle}>{post.title}</span>
				{post.description && <span className={cl.postDesc}>{post.description}</span>}
				<div className={cl.postLikesContainer}>
					<button onClick={likeButtonHandler} data-liked={post.likes.includes(user.id)} className={cl.postLikeButton}>
						<FaHeart />
					</button>
					<span>{post.likes.length}</span>
				</div>
			</div>
		</Modal>
	);
};

export default PostModal;