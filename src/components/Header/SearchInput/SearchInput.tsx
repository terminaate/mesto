import React, { useEffect, useRef, useState } from 'react';
import cl from './SearchInput.module.scss';
import { FaSearch } from 'react-icons/all';
import { useTranslation } from 'react-i18next';
import backgroundImage from '@/utils/backgroundImage';
import useInputState from '@/hooks/useInputState';
import { UserProps } from '@/types/User';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useDebounce } from 'use-debounce';
import UserService from '@/services/UserService';
import { AnimatePresence, motion } from 'framer-motion';

const SearchInput = () => {
  const { t } = useTranslation('user');
  const [searchInput, onSearchInputChange, setSearchInput] = useInputState('');
  const [searchVariants, setSearchVariants] = useState<UserProps[]>([]);
  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const navigate = useNavigate();
  const searchVariantsRef = useRef<null | HTMLDivElement>(null);
  const searchInputRef = useRef<null | HTMLDivElement>(null);

  useOutsideClick(
    searchVariantsRef,
    () => setSearchVariants([]),
    'mousedown',
    searchInputRef,
  );

  useEffect(() => {
    UserService.searchUsers(searchInput.toLowerCase())
      .then((r) => setSearchVariants(r.data))
      .catch((er) => console.log(er));
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
        <input
          value={searchInput}
          onChange={onSearchInputChange}
          className={cl.searchInput}
          type="text"
          placeholder={t('Search')}
        />
      </div>
      <AnimatePresence>
        {searchVariants && searchVariants.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={searchVariantsRef}
            className={cl.searchInputVariants}
          >
            {searchVariants.map((variant, key) => (
              <div
                key={key}
                onClick={() => navigateToUserPage(variant.username)}
                className={cl.searchInputVariant}
              >
                <div
                  className={cl.variantAvatar}
                  style={backgroundImage(variant.avatar!, 64)}
                />
                <div className={cl.variantInfo}>
                  <span className={cl.variantName}>{variant.username}</span>
                  <span className={cl.variantBio}>{variant.bio}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
