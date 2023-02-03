// search component
import React, { useState } from 'react';
import './Search.scss';

const Search = () => {
  const [search, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="What do you want to watch?"
        value={search}
        onChange={handleChange}
      />
      <button className="search__button">Search</button>
    </div>
  );
};

export default Search;
