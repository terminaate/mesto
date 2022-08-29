import React from 'react';
import cl from './SearchInput.module.css';
import { FaSearch } from 'react-icons/all';

const SearchInput = () => {
	return (
		<div className={cl.searchInputContainer}>
			<FaSearch className={cl.searchIcon} />
			<input className={cl.searchInput} type='text' placeholder={'Поиск'} />
		</div>
	);
};

export default SearchInput;