import cl from './UserPage.module.css';
import UserService from '@/services/UserService';

// Hooks
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useUserAvatar from '@/hooks/useUserAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import useBackgroundImage from '@/hooks/useBackgroundImage';

// Components && types
import ChangeAvatarModal from '@/components/ChangeAvatarModal';
import PostModal from '@/components/PostModal/PostModal';
import { PostProps } from '@/types/Post';
import { UserProps } from '@/types/User';
import BasicPage from '@/components/BasicPage';
import Button from '@/components/UI/Button';

// Icons
import { FaHeart, FaPen } from 'react-icons/fa';
import { likePost } from '@/store/reducers/user/userAPI';

const UserPage = () => {
	const { user: selfUserData } = useAppSelector(state => state.userSlice);
	const dispatch = useAppDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const { t } = useTranslation('user');
	const [userData, setUserData] = useState<UserProps>({} as UserProps);
	const [avatarModal, setAvatarModal] = useState<boolean>(false);
	const isSelfUserPage = params.id === '@me' || params.id === selfUserData.id && userData.id === selfUserData.id;
	const [postModal, setPostModal] = useState<boolean>(false);
	const [postData, setPostData] = useState<PostProps>({} as PostProps);

	const openPostModal = (data: PostProps) => {
		setPostData(data);
		setPostModal(true);
	};

	const getUserData = async () => {
		if (isSelfUserPage) {
			setUserData(selfUserData);
		} else {
			try {
				const { data } = await UserService.getUser(params.id!);
				const { data: posts } = await UserService.getUserPosts(params.id!);
				setUserData({ ...data, avatar: useUserAvatar(data.id), posts });
			} catch (e) {
				setUserData({} as UserProps);
			}
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	useEffect(() => {
		if (isSelfUserPage) {
			setUserData(selfUserData);
		}
	}, [selfUserData]);

	const userPageButtonHandler = () => {
		if (isSelfUserPage) {
			navigate('/settings');
		} else {
			// Add to friends
		}
	};

	const likePostButtonHandler = async (e: MouseEvent<SVGElement>, postId: string) => {
		e.stopPropagation();
		if (isSelfUserPage) {
			dispatch(likePost(postId));
		} else {
			const { data: post } = await UserService.likePost(postId);
			const newPosts = [...userData.posts!];
			newPosts[newPosts.findIndex(p => p.id === post.id!)] = post;
			setUserData({ ...userData, posts: newPosts });
		}
	};

	return (
		<>
			<BasicPage className={cl.userPage}>
				{(userData && Object.values(userData).length > 0) && (
					<div className={cl.container}>
						<div className={cl.userInfoContainer}>
							<div onClick={() => isSelfUserPage ? setAvatarModal(true) : ''} data-page={isSelfUserPage}
									 className={cl.userAvatar}
									 style={useBackgroundImage(userData.avatar!)}>
								{isSelfUserPage && (
									<>
										<div />
										<FaPen />
									</>
								)}
							</div>
							<span className={cl.userName}>{userData.username}</span>
							<span className={cl.userBio}>{userData.bio}</span>
							<Button
								className={cl.userInfoButton}
								onClick={userPageButtonHandler}>{isSelfUserPage ? t('Edit profile') : t('Add to friends')}</Button>
						</div>
						<div className={cl.postsContainer}>
							{userData.posts?.map(post => (
								<div onClick={() => openPostModal(post)} key={post.id} className={cl.post}>
									<div className={cl.postImage} style={useBackgroundImage(post.image)}>
										<div data-liked={post.likes?.includes(selfUserData.id)}>
											<FaHeart onClick={e => likePostButtonHandler(e, post.id!)} />
											<span>{post.likes?.length}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</BasicPage>
			{isSelfUserPage && (
				<ChangeAvatarModal modal={avatarModal} setModal={setAvatarModal} />
			)}
			<PostModal modal={postModal} setModal={setPostModal} post={postData} setPost={setPostData} userData={userData}
								 setUserData={setUserData} />
		</>
	);
};

export default UserPage;