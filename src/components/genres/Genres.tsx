import React from 'react';
import './Genres.scss';

const Genres: React.FC<{ genres: Array<string> }> = ({ genres }) => {
  return (
    <div className="genres">
      {genres.map((genre) => (
        <span className="genres__item" key={genre}>
          {genre}
        </span>
      ))}
    </div>
  );
};

export default Genres;
