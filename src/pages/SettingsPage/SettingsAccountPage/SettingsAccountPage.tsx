import React from 'react';
import cl from "./SettingsAccountPage.module.scss";
import { useAppSelector } from '@/store';
import BasicSettingsPage from '@/pages/SettingsPage/BasicSettingsPage/BasicSettingsPage';

const SettingsAccountPage = () => {
  const {user} = useAppSelector(state => state.userSlice);

  return (
    <BasicSettingsPage className={cl.accountPage}>
      <img src={user.avatar} alt='' />
    </BasicSettingsPage>
  );
};

export default SettingsAccountPage;
