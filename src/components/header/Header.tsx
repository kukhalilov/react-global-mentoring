import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAddModalOpen } from '../../state/features/modalsSlice';
import { RootState } from '../../state/store';
import AddEditModal from '../addEditModal/AddEditModal';
import ResultModal from '../resultModal/ResultModal';
import './Header.scss';
import { useParams } from 'react-router-dom';

const Header = () => {
  const modalsState = useSelector((state: RootState) => state.modals);
  const dispatch = useDispatch();

  const { searchQuery } = useParams<{ searchQuery: string }>();

  const [search, setSearch] = useState(searchQuery || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleSearch = () => {
    if (search) {
      window.location.href = `/search/${search.trim()}`;
    }
  };

  return (
    <>
      <section className="header">
        <div className="header__overlay">
          <div className="header__content">
            <h1>Find your movie</h1>
            <div className="search">
              <input
                className="search__input"
                type="text"
                placeholder="What do you want to watch?"
                value={search}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                ref={inputRef}
              />
              <button className="search__button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="add__movie">
        <button
          className="add__movie__button"
          onClick={() => {
            dispatch(setIsAddModalOpen(true));
          }}
        >
          + Add Movie
        </button>
        {modalsState.isAddModalOpen && <AddEditModal addOrEdit={'Add'} />}
        {modalsState.isAddResultModalOpen && <ResultModal isAdded={true} />}
      </div>
    </>
  );
};

export default Header;
