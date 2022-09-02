import BasicPage from '@/components/BasicPage';
import useBackgroundImage from '@/hooks/useBackgroundImage';
import { useAppSelector } from '@/store';
import cl from './UserPage.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserProps } from '@/types/User';
import UserService from '@/services/UserService';
import useUserAvatar from '@/hooks/useUserAvatar';
import Button from '@/components/UI/Button';
import { useTranslation } from 'react-i18next';
import ChangeAvatarModal from '@/components/ChangeAvatarModal';
import { FaPen } from 'react-icons/all';

const UserPage = () => {
	const { user: selfUserData } = useAppSelector(state => state.userSlice);
	const params = useParams();
	const navigate = useNavigate();
	const [userData, setUserData] = useState<UserProps>({} as UserProps);
	const { t } = useTranslation('user');
	const [avatarModal, setAvatarModal] = useState<boolean>(false);
	const isSelfUserPage = params.id === '@me' || params.id === selfUserData.id && userData.id === selfUserData.id;

	const getUserData = async () => {
		if (isSelfUserPage) {
			setUserData(selfUserData);
		} else {
			try {
				const { data } = await UserService.getUser(params.id!);
				if (!data) {
					return navigate('/404');
				}
				const { data: posts } = await UserService.getUserPosts(params.id!);
				setUserData({ ...data, avatar: useUserAvatar(data.id), posts });
			} catch (e) {
				setUserData({} as UserProps);
			}
		}
	};

	useEffect(() => {
		getUserData();
	}, [selfUserData]);

	const userPageButtonHandler = () => {
		if (isSelfUserPage) {
			navigate('/settings');
		} else {
			// Add to friends
		}
	};

	return (
		<>
			<BasicPage className={cl.userPage}>
				{(userData && Object.values(userData).length > 0) && (
					<div className={cl.container}>
						<div className={cl.userInfoContainer}>
							{isSelfUserPage ? (
								<div onClick={() => setAvatarModal(true)} className={cl.userAvatar}
										 style={useBackgroundImage(userData.avatar!)}>
									<div />
									<FaPen />
								</div>
							) : (
								<div className={cl.userAvatar}
										 style={useBackgroundImage(userData.avatar!)} />
							)}
							<span className={cl.userName}>{userData.username}</span>
							<span className={cl.userBio}>{userData.bio}</span>
							<Button
								className={cl.userInfoButton}
								onClick={userPageButtonHandler}>{isSelfUserPage ? t('Edit profile') : t('Add to friends')}</Button>
						</div>
						<div className={cl.postsContainer}>
							{userData.posts?.map((post, key) => (
								<div key={key} className={cl.post}>
									<div style={useBackgroundImage(post.image)}/>
								</div>
							))}
						</div>
					</div>
				)}
			</BasicPage>
			{isSelfUserPage && (
				<ChangeAvatarModal modal={avatarModal} setModal={setAvatarModal} />
			)}
		</>
	);
};

export default UserPage;