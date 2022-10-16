import React, { MouseEvent, useEffect, useState } from 'react';
import cl from './UserPage.module.scss';
import UserService from '@/services/UserService';
import { likePost } from '@/store/reducers/user/userAPI';
import { useTranslation } from 'react-i18next';
import userAvatar from '@/utils/userAvatar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import backgroundImage from '@/utils/backgroundImage';

// Components && types
import ChangeAvatarModal from '@/components/ChangeAvatarModal';
import PostModal from '@/components/PostModal';
import { PostProps } from '@/types/Post';
import { UserProps } from '@/types/User';
import BasicPage from '@/components/BasicPage';
import Button from '@/components/UI/Button';

// Icons
import { FaHeart, FaPen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserPage = () => {
  const { user: selfUserData, authorized } = useAppSelector(
    (state) => state.userSlice,
  );
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('user');
  const [userData, setUserData] = useState<UserProps>({} as UserProps);
  const [avatarModal, setAvatarModal] = useState<boolean>(false);
  const isSelfUserPage =
    (params.id === '@me' || params.id === selfUserData.id) &&
    userData.id === selfUserData.id;
  const [postModal, setPostModal] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostProps>({} as PostProps);

  const openPostModal = (data: PostProps) => {
    setPostData(data);
    setPostModal(true);
  };

  const getUserData = async () => {
    if (!authorized) return;

    if (isSelfUserPage) {
      setUserData(selfUserData);
    } else {
      try {
        const { data } = await UserService.getUser(params.id!);
        const { data: posts } = await UserService.getUserPosts(params.id!);
        setUserData({ ...data, avatar: userAvatar(data.id), posts });
      } catch (e) {
        setUserData({} as UserProps);
      }
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith('/users')) {
      getUserData();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isSelfUserPage) {
      setUserData(authorized ? selfUserData : {});
    }
  }, [selfUserData]);

  const userPageButtonHandler = () => {
    if (isSelfUserPage) {
      navigate('/settings');
    } else {
      // Add to friends
    }
  };

  const likePostButtonHandler = async (
    e: MouseEvent<SVGElement>,
    postId: string,
  ) => {
    e.stopPropagation();
    if (isSelfUserPage) {
      dispatch(likePost(postId));
    } else {
      const { data: post } = await UserService.likePost(postId);
      const newPosts = [...userData.posts!];
      newPosts[newPosts.findIndex((p) => p.id === post.id!)].likes = post.likes;
      setUserData({ ...userData, posts: newPosts });
    }
  };

  return (
    <>
      <BasicPage className={cl.userPage}>
        {userData && Object.values(userData).length > 0 && (
          <div className={cl.container}>
            <div className={cl.userInfoContainer}>
              <div
                onClick={() => (isSelfUserPage ? setAvatarModal(true) : '')}
                data-page={isSelfUserPage}
                className={cl.userAvatar}
                style={backgroundImage(userData.avatar!, 256)}
              >
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
                onClick={userPageButtonHandler}
              >
                {isSelfUserPage ? t('Edit profile') : t('Add to friends')}
              </Button>
            </div>
            {userData.posts && userData.posts.length > 0 && (
              <motion.div
                transition={{ duration: 0.5 }}
                initial={{
                  opacity: 0,
                  translateY: 50,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                exit={{
                  opacity: 0,
                  translateY: 50,
                }}
                className={cl.postsContainer}
              >
                {userData.posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => openPostModal(post)}
                    className={cl.post}
                  >
                    <div
                      className={cl.postImage}
                      style={backgroundImage(post.image, 1024)}
                    />
                    <div
                      className={cl.postLikes}
                      data-liked={post.likes?.includes(selfUserData.id)}
                    >
                      <FaHeart
                        onClick={(e) => likePostButtonHandler(e, post.id!)}
                      />
                      <span>{post.likes?.length}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </BasicPage>
      {isSelfUserPage && (
        <ChangeAvatarModal modal={avatarModal} setModal={setAvatarModal} />
      )}
      <PostModal
        modal={postModal}
        setModal={setPostModal}
        post={postData}
        setPost={setPostData}
        userData={userData}
        setUserData={setUserData}
      />
    </>
  );
};

export default UserPage;
