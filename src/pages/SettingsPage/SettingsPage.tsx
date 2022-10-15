import React from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './SettingsPage.module.css';
import { useAppSelector } from '@/store';
import { FaUser } from 'react-icons/all';
import { NavLink, Outlet } from 'react-router-dom';

const SettingsPage = () => {
  const { user } = useAppSelector((state) => state.userSlice);

  return (
    <>
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
    </>
  );
};

export default SettingsPage;
