import clsx from 'clsx';
import * as React from 'react';

import BurgerIcon from 'assets/icons/burger.svg?react';
import SearchIcon from 'assets/icons/search.svg?react';
import HeartIcon from 'assets/icons/heart.svg?react';
import BagIcon from 'assets/icons/bag.svg?react';
import UserIcon from 'assets/icons/user.svg?react';
import logo from 'assets/logo.png';

import s from './Header.module.scss';

type HeaderProps = {
  onMenuClick?: () => void;
  onSearchChange?: (value: string) => void;
  onFavoritesClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
};

const Header = ({
  onMenuClick,
  onSearchChange,
  onFavoritesClick,
  onCartClick,
  onProfileClick,
  className,
}: HeaderProps): React.ReactElement => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  return (
    <header className={clsx(s.header, className)}>
      <div className={s.container}>
        <div className={s.leftSection}>
          <button
            type="button"
            className={s.iconButton}
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <BurgerIcon className={s.icon} />
          </button>
          <img src={logo} alt="HFurniture" className={s.logo} />
        </div>

        <div className={s.rightSection}>
          <div className={s.searchContainer}>
            <input
              type="text"
              className={s.searchInput}
              placeholder="Search anything"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <SearchIcon className={s.searchIcon} />
          </div>

          <div className={s.actions}>
            <button
              type="button"
              className={s.iconButton}
              onClick={onFavoritesClick}
              aria-label="Favorites"
            >
              <HeartIcon className={s.icon} />
            </button>
            <button
              type="button"
              className={s.iconButton}
              onClick={onCartClick}
              aria-label="Shopping cart"
            >
              <BagIcon className={s.icon} />
            </button>
            <button
              type="button"
              className={s.iconButton}
              onClick={onProfileClick}
              aria-label="User profile"
            >
              <UserIcon className={s.icon} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
