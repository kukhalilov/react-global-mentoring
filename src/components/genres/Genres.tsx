import React from 'react';
import './Genres.scss';
import { useSearchParams } from 'react-router-dom';

export const genres = [
  'action',
  'adventure',
  'comedy',
  'crime',
  'drama',
  'fantasy',
  'horror',
  'mystery',
  'thriller',
];

const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams.toString());

  const genresFilter = searchParams.get('genre')?.split(',') || [];

  const handleAllClick = () => {
    updatedSearchParams.delete('genre');
    setSearchParams(updatedSearchParams.toString());
  };

  const handleGenreClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const genre = e.currentTarget.textContent?.toLowerCase();
    if (genre && genresFilter.includes(genre)) {
      const newGenresFilter = genresFilter.filter((item) => item !== genre);
      if (newGenresFilter.length === 0) {
        updatedSearchParams.delete('genre');
        setSearchParams(updatedSearchParams.toString());
        return;
      }
      updatedSearchParams.set(
        'genre',
        newGenresFilter.length > 1
          ? newGenresFilter.join(',')
          : newGenresFilter[0],
      );
      setSearchParams(updatedSearchParams.toString());
    } else if (genre) {
      const newGenresFilter = [...genresFilter, genre];
      updatedSearchParams.set(
        'genre',
        newGenresFilter.length > 1
          ? newGenresFilter.join(',')
          : newGenresFilter[0],
      );
      setSearchParams(updatedSearchParams.toString());
    }
  };

  return (
    <div className="genres">
      <span
        className={
          genresFilter.length === 0 ? 'genres__item active' : 'genres__item'
        }
        onClick={handleAllClick}
        role="presentation"
      >
        All
      </span>
      {genres.map((genre) => (
        <span
          className={
            genresFilter.includes(genre)
              ? 'genres__item active'
              : 'genres__item'
          }
          key={genre}
          onClick={handleGenreClick}
          role="presentation"
        >
          {genre.charAt(0)?.toUpperCase() + genre.slice(1).toLowerCase()}
        </span>
      ))}
    </div>
  );
};

export default Genres;
