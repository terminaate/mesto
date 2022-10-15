import React, { FC, useEffect, useRef, useState } from 'react';
import { PostProps } from '@/types/Post';
import Modal from '@/components/Modal';
import cl from './PostModal.module.css';
import { FaEllipsisH, FaHeart, FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/store';
import { deletePost, likePost } from '@/store/reducers/user/userAPI';
import UserService from '@/services/UserService';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserProps } from '@/types/User';
import backgroundImage from '@/utils/backgroundImage';
import ContextMenu from '@/components/ContextMenu/ContextMenu';
import { useTranslation } from 'react-i18next';

interface IPostModal {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostProps;
  setPost: React.Dispatch<React.SetStateAction<PostProps>>;
  userData: UserProps;
  setUserData: React.Dispatch<React.SetStateAction<UserProps>>;
}

const PostModal: FC<IPostModal> = ({
                                     modal,
                                     setModal,
                                     post,
                                     setPost,
                                     userData,
                                     setUserData,
                                   }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isUserOwnerOfPost =
    post?.userId === user.id &&
    (location.pathname === `/users/${user.id}` ||
      location.pathname === '/users/@me');
  const navigate = useNavigate();
  const [morePopup, setMorePopup] = useState<boolean>(false);
  const listenToPosts = useRef<boolean>(true);
  const { t } = useTranslation('user');

  useEffect(() => {
    if (listenToPosts && Object.values(userData).length > 0) {
      // Sync data with user posts (just for rerender)
      setPost(userData.posts!.find((p) => p.id === post.id) as PostProps);
    }
  }, [userData.posts]);

  if (!post || Object.values(post).length <= 0) {
    return <></>;
  }

  const likeButtonHandler = async () => {
    if (isUserOwnerOfPost) {
      dispatch(likePost(post.id));
    } else {
      const { data: newPost } = await UserService.likePost(post.id);
      const newPosts = [...userData.posts!];
      newPosts[newPosts.findIndex((p) => p.id === newPost.id)].likes =
        newPost.likes;
      setUserData({ ...userData, posts: newPosts });
    }
  };

  const navigateToUserPage = () => {
    setModal(false);
    if (!isUserOwnerOfPost) {
      navigate(`/users/${userData.id}`);
    }
  };

  const deletePostButtonHandler = () => {
    listenToPosts.current = false;
    setModal(false);
    dispatch(deletePost(post.id));
  };

  return (
    <Modal className={cl.postModal} modal={modal} setModal={setModal}>
      <div className={cl.postImageContainer}>
        <img src={post.image} alt={''} className={cl.postImage} />
        <div className={cl.postStatsContainer}>
          <div className={cl.postLikesContainer}>
            <button
              onClick={likeButtonHandler}
              data-liked={post.likes.includes(user.id)}
              className={cl.postLikeButton}
            >
              <FaHeart />
            </button>
            <span>{post.likes.length}</span>
          </div>
        </div>
      </div>
      <div className={cl.postInfoContainer}>
        <div className={cl.postInfoHeaderContainer}>
          <div onClick={navigateToUserPage} className={cl.postInfoHeaderUser}>
            <div
              style={backgroundImage(userData.avatar!, 64)}
              className={cl.headerUserAvatar}
            />
            <span className={cl.headerUserName}>{userData.username}</span>
          </div>
          <button
            onClick={() => setMorePopup(!morePopup)}
            className={cl.postMoreButton}
          >
            <FaEllipsisH />
            <ContextMenu state={morePopup} setState={setMorePopup}>
              {isUserOwnerOfPost && (
                <button onClick={deletePostButtonHandler} data-important={true}>
                  <FaTrash />
                  {t('Delete post')}
                </button>
              )}
            </ContextMenu>
          </button>
        </div>
        <div className={cl.postComments}>
          <span className={cl.postTitle}>{post.title}</span>
          {post.description && (
            <span className={cl.postDesc}>{post.description}</span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
