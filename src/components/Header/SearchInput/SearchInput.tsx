import React, { useEffect, useRef, useState } from 'react';
import cl from './SearchInput.module.css';
import { FaSearch } from 'react-icons/all';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import useBackgroundImage from '@/hooks/useBackgroundImage';
import useInputState from '@/hooks/useInputState';
import useDebounce from '@/hooks/useDebounce';
import { UserProps } from '@/types/User';
import UserService from '@/services/UserService';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '@/hooks/useOutsideClick';

const SearchInput = () => {
	const { t } = useTranslation('user');
	const [searchInput, onSearchInputChange, setSearchInput] = useInputState('');
	const [searchVariants, setSearchVariants] = useState<UserProps[]>([]);
	const debouncedSearchInput = useDebounce<string>(searchInput, 500);
	const navigate = useNavigate();
	const searchVariantsRef = useRef<null | HTMLDivElement>(null);
	const searchInputRef = useRef<null | HTMLDivElement>(null);

	useOutsideClick(searchVariantsRef, () => setSearchVariants([]), searchInputRef);

	useEffect(() => {
		UserService.searchUsers(searchInput.toLowerCase())
			.then(r => setSearchVariants(r.data))
			.catch(er => console.log(er));
	}, [debouncedSearchInput]);

	const navigateToUserPage = (username: string) => {
		navigate(`/users/${username}`);
		setSearchVariants([]);
		setSearchInput('');
	};

	return (
		<div className={cl.container}>
			<div ref={searchInputRef} className={cl.searchInputContainer}>
				<FaSearch className={cl.searchIcon} />
				<input value={searchInput} onChange={onSearchInputChange} className={cl.searchInput} type='text'
							 placeholder={t('Search')} />
			</div>
			<AnimatePresence>
				{searchVariants && searchVariants.length > 0 && (
					<motion.div ref={searchVariantsRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
											className={cl.searchInputVariants}>
						{searchVariants.map((variant, key) => (
							<div key={key} onClick={() => navigateToUserPage(variant.username)} className={cl.searchInputVariant}>
								<div className={cl.variantAvatar} style={useBackgroundImage(variant.avatar!)} />
								<span className={cl.variantName}>{variant.username}</span>
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SearchInput;