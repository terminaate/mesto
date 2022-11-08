import React, { useEffect } from 'react';
import BasicPage from '@/components/BasicPage';
import cl from './SettingsPage.module.scss';
import { FaPaintBrush, FaUser } from 'react-icons/all';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavPreventedLink from '@/components/NavPreventedLink';
import { useTranslation } from 'react-i18next';


const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('settings');

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('account');
    }
  }, [location.pathname]);

  return (
    <BasicPage exitAnim={false} className={cl.settingsPage}>
      <div className={cl.settingsContainer}>
        <div className={cl.settingsNavContainer}>
          <NavPreventedLink to={'account'}>
            <FaUser />
            <span>{t('Account')}</span>
          </NavPreventedLink>
          <NavPreventedLink to={'appearance'}>
            <FaPaintBrush />
            <span>{t('Appearance')}</span>
          </NavPreventedLink>
        </div>
        <div className={cl.settingsPageContainer}>
          <Outlet />
        </div>
      </div>
    </BasicPage>
  );
};

export default SettingsPage;
