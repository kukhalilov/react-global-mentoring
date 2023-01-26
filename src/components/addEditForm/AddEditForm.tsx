import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';
import './AddEditForm.scss';

export interface MovieInfo {
  id?: number;
  title?: string;
  url?: string;
  genres?: Array<string>;
  date?: string;
  rating?: number | string;
  runtime?: number | string;
  overview?: string;
}

interface AddEditFormProps {
  movie?: MovieInfo;
  movies?: MovieInfo[];
  setMovie?: (a: MovieInfo) => void;
  addMovie?: (a: MovieInfo) => void;
  setIsOpen: (a: boolean) => void;
  setShow?: (a: boolean) => void;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  movie,
  movies,
  setMovie,
  addMovie,
  setIsOpen,
  setShow,
}) => {
  const [options] = useState([
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Thriller',
  ]);

  const initialValue = {
    id: movie ? movie.id : movies && movies.length + 1,
    title: movie ? movie.title : '',
    url: movie ? movie.url : '',
    genres: movie ? movie.genres : [],
    date: movie ? movie.date : '',
    overview: movie ? movie.overview : '',
    rating: movie ? movie.rating : '',
    runtime: movie ? movie.runtime : '',
  };

  const [singleMovie, setSingleMovie] = useState<MovieInfo>(initialValue);

  const multiselectRef = React.createRef<Multiselect>();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const updatedSingleMovie = {
      ...singleMovie,
      rating: Number(singleMovie.rating),
      runtime: Number(singleMovie.runtime),
    };
    if (addMovie) {
      addMovie(updatedSingleMovie);
      setIsOpen(false);
      setShow && setShow(true);
    } else {
      setMovie && setMovie(updatedSingleMovie);
      setIsOpen(false);
      setShow && setShow(true);
    }
  };

  return (
    <form className="form" action="">
      <div className="form__group">
        <div className="form__control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Moana"
            value={singleMovie.title}
            onChange={(e) => {
              setSingleMovie({ ...singleMovie, title: e.target.value });
            }}
          />
        </div>
        <div className="form__control">
          <label htmlFor="movie_url">Movie URL</label>
          <input
            type="text"
            name="movie_url"
            id="movie_url"
            placeholder="https://"
            value={singleMovie.url}
            onChange={(e) =>
              setSingleMovie({ ...singleMovie, url: e.target.value })
            }
          />
        </div>
        <div className="form__control genre">
          <label htmlFor="genre">Genre</label>
          <Multiselect
            className="multiselect"
            isObject={false}
            options={options}
            showCheckbox={true}
            displayValue="name"
            placeholder="Select Genre"
            style={{ chips: { background: '#f65261' } }}
            ref={multiselectRef}
            selectedValues={singleMovie.genres}
            onSelect={(selectedList: Array<string>) => {
              setSingleMovie({
                ...singleMovie,
                genres: selectedList.map((item) => item),
              });
            }}
            onRemove={(selectedList: Array<string>) => {
              setSingleMovie({
                ...singleMovie,
                genres: selectedList.map((item) => item),
              });
            }}
          />
        </div>
      </div>

      <div className="form__group">
        <div className="form__control">
          <label htmlFor="release_date">Release Date</label>
          <input
            type="date"
            name="release_date"
            id="release_date"
            placeholder="Select Date"
            value={singleMovie.date}
            onChange={(e) =>
              setSingleMovie({ ...singleMovie, date: e.target.value })
            }
            required
          />
        </div>
        <div className="form__control">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            id="rating"
            placeholder="7.8"
            value={singleMovie.rating}
            onChange={(e) =>
              setSingleMovie({ ...singleMovie, rating: e.target.value })
            }
          />
        </div>
        <div className="form__control">
          <label htmlFor="runtime">Runtime</label>
          <input
            type="number"
            name="runtime"
            id="runtime"
            placeholder="minutes"
            value={singleMovie.runtime}
            onChange={(e) =>
              setSingleMovie({ ...singleMovie, runtime: e.target.value })
            }
          />
        </div>
      </div>

      <div className="overview">
        <label htmlFor="overview">Overview</label>
        <textarea
          name="overview"
          id="overview"
          cols={30}
          rows={9}
          placeholder="Movie description"
          value={singleMovie.overview}
          onChange={(e) =>
            setSingleMovie({ ...singleMovie, overview: e.target.value })
          }
        />
      </div>
      <div className="form__footer">
        <button
          type="reset"
          onClick={() => {
            setSingleMovie(initialValue);
          }}
        >
          Reset
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddEditForm;
