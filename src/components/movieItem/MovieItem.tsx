import React from 'react';
import './MovieItem.scss';

interface MovieItemProps {
  img: string;
  title: string;
  genre: string;
  year: string;
}

const MovieItem: React.FC<MovieItemProps> = ({ img, title, genre, year }) => {
  return (
    <div className="movie__item">
      <img src={img} alt="title" />
      <div className="title__date">
        <span>{title}</span>
        <span>{year}</span>
      </div>
      <p className="genre">{genre}</p>
      <div className="context">
        <span className="context__icon"></span>
      </div>
    </div>
  );
};

export default MovieItem;
