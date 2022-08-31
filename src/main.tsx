import React from 'react';
import ReactDOM from 'react-dom/client';
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

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		detection: {
			order: ['navigator', 'localStorage'],
			lookupLocalStorage: 'lang'
		},
		resources: {
			ru: ruNs,
			en: enNs
		},
		lng: 'ru',
		fallbackLng: 'en',
		debug: true,

		react: {
			transSupportBasicHtmlNodes: true
		},

		interpolation: {
			escapeValue: false
		}
	});


ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);

