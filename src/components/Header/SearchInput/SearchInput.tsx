import React from 'react';
import cl from './SearchInput.module.css';
import { FaSearch } from 'react-icons/all';
import { useTranslation } from 'react-i18next';

const SearchInput = () => {
	const {t} = useTranslation("user")

	return (
		<div className={cl.searchInputContainer}>
			<FaSearch className={cl.searchIcon} />
			<input className={cl.searchInput} type='text' placeholder={t("Search")} />
		</div>
	);
};

export default SearchInput;