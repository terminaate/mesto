import React, { useState } from 'react';
import { useAppSelector } from '@/store';
import cl from './Header.module.css';
import SearchInput from './SearchInput';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/UI/Button';
import UserAvatar from './UserAvatar';
import { FaPlus } from 'react-icons/all';
import CreatePostModal from '@/components/CreatePostModal';
import logoImg from '!/images/logo.svg';

const Header = () => {
  const { authorized } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const location = useLocation();
  const [createPostModal, setCreatePostModal] = useState<boolean>(false);

  const navigateToLoginPage = () => {
    navigate('/login');
  };

  const createPostButtonClick = () => {
    setCreatePostModal(true);
    if (location.pathname !== '/users/@me') {
      navigate('/users/@me');
    }
  };

  // TODO
  // fix double modals with same content

  return (
    <div className={cl.headerContainer}>
      <div className={cl.logo}>
        <img src={logoImg} alt='' />
      </div>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <>
          {authorized ? <SearchInput /> : <span />}
          {authorized ? (
            <div className={cl.userButtons}>
              <button
                onClick={createPostButtonClick}
                className={cl.createPostButton}
              >
                <FaPlus />
              </button>
              <UserAvatar />
            </div>
          ) : (
            <Button onClick={navigateToLoginPage}>Войти</Button>
          )}
          {authorized && (
            <CreatePostModal
              modal={createPostModal}
              setModal={setCreatePostModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
