import React, { useEffect } from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './SettingsPage.module.scss';
import { FaUser } from 'react-icons/all';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('account');
    }
  }, [location.pathname]);

  return (
    <BasicPage className={cl.settingsPage}>
      <div className={cl.settingsContainer}>
        <div className={cl.settingsNavContainer}>
          <NavLink to={'account'}>
            <FaUser />
            Account
          </NavLink>
        </div>
        <div className={cl.settingsPageContainer}>
          <Outlet />
        </div>
      </div>
    </BasicPage>
  );
};

export default SettingsPage;
