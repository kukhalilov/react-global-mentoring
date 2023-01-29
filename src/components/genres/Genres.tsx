import React from 'react';
import './Genres.scss';
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../../state/features/movieDetailsSlice';

export const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Thriller',
];

interface GenresProps {
  filter: string[];
  setFilter: (a: string[]) => void;
}

const Genres: React.FC<GenresProps> = ({ filter, setFilter }) => {
  const dispatch = useDispatch();

  const handleAllClick = () => {
    setFilter([]);
    dispatch(setSelectedMovie(null));
  };

  const handleGenreClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const genre = e.currentTarget.textContent;
    if (genre && filter.includes(genre)) {
      setFilter(filter.filter((item) => item !== genre));
    } else if (genre) {
      setFilter([...filter, genre]);
    }
    dispatch(setSelectedMovie(null));
  };

  return (
    <div className="genres">
      <span
        className={filter.length === 0 ? 'genres__item active' : 'genres__item'}
        onClick={handleAllClick}
        role="presentation"
      >
        All
      </span>
      {genres.map((genre) => (
        <span
          className={
            filter.includes(genre) ? 'genres__item active' : 'genres__item'
          }
          key={genre}
          onClick={handleGenreClick}
          role="presentation"
        >
          {genre}
        </span>
      ))}
    </div>
  );
};

export default Genres;
