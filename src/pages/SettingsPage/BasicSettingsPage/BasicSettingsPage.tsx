import React, { FC, ReactNode } from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './BasicSettingsPage.module.scss';
import classNames from 'classnames';

interface IBasicSettingsPage {
  children: ReactNode;
  className?: string;
}

const BasicSettingsPage: FC<IBasicSettingsPage> = ({ children, className }) => {
  return (
    <BasicPage className={classNames(cl.settingsPage, className!)}>
      {children}
    </BasicPage>
  );
};

export default BasicSettingsPage;