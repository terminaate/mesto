import React from 'react';
import cl from "./SettingsAccountPage.module.scss";
import { useAppSelector } from '@/store';
import BasicSettingsPage from '@/pages/SettingsPage/BasicSettingsPage/BasicSettingsPage';
import Input from '@/components/UI/Input';

const SettingsAccountPage = () => {
  const {user} = useAppSelector(state => state.userSlice);

  return (
    <BasicSettingsPage className={cl.accountPage}>
      <Input placeholder={"123"}/>
    </BasicSettingsPage>
  );
};

export default SettingsAccountPage;
