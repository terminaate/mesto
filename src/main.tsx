import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ruNs from './locales/ru';
import enNs from './locales/en';
import NavigateSetter from '@/components/NavigateSetter';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['navigator', 'localStorage'],
      lookupLocalStorage: 'lang',
    },
    resources: {
      ru: ruNs,
      en: enNs,
    },
    fallbackLng: 'en',
    debug: import.meta.env.MODE === 'development',

    react: {
      transSupportBasicHtmlNodes: true,
    },

    interpolation: {
      escapeValue: false,
    },
  });

const root = createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <NavigateSetter />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
