import React, { useState } from 'react';
import cl from './UserAvatar.module.scss';
import backgroundImage from '@/utils/backgroundImage';
import { logout } from '@/store/reducers/user/authAPI';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContextMenu from '@/components/ContextMenu';
import { FaDoorOpen, FaUser, IoSettingsSharp } from 'react-icons/all';

const UserAvatar = () => {
  const dispatch = useAppDispatch();
  const [userPopup, setUserPopup] = useState(false);
  const { user } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('user');

  const logoutDispatch = () => {
    dispatch(logout());
  };

  return (
    <div
      className={cl.userAvatarContainer}
      onClick={() => setUserPopup(true)}
      style={backgroundImage(user.avatar, 64)}
    >
      <ContextMenu state={userPopup} setState={setUserPopup}>
        {location.pathname !== '/users/@me' && (
          <button onClick={() => navigate('/users/@me')}>
            <FaUser />
            {t('Your page')}
          </button>
        )}
        <button onClick={() => navigate('/settings')}>
          <IoSettingsSharp style={{ fontSize: '15px' }} />
          {t('Settings')}
        </button>
        <button onClick={logoutDispatch}>
          <FaDoorOpen />
          {t('Logout')}
        </button>
      </ContextMenu>
    </div>
  );
};

export default UserAvatar;
