import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';
import './AddEditForm.scss';
import { RootState } from '../../state/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsAddModalOpen,
  setIsAddResultModalOpen,
  setIsEditResultModalOpen,
  setIsThereErrorInResult,
} from '../../state/features/modalsSlice';
import { setSelectedMovie } from '../../state/features/movieDetailsSlice';
import {
  useAddMovieMutation,
  useUpdateMovieMutation,
} from '../../state/api/moviesApi';
import { genres } from '../genres/Genres';

interface AddEditFormProps {
  addOrEdit?: string;
}

const AddEditForm: React.FC<AddEditFormProps> = ({ addOrEdit }) => {
  const dispatch = useDispatch();
  const movieForDetailsView = useSelector(
    (state: RootState) => state.movieDetails.selectedMovie,
  );
  const movie = useSelector((state: RootState) => state.modals.editModalMovie);
  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();

  const initialValue = {
    id: movie ? movie.id : 0,
    title: movie ? movie.title : '',
    poster_path: movie ? movie.poster_path : '',
    genres: movie ? movie.genres : [],
    release_date: movie ? movie.release_date : '',
    overview: movie ? movie.overview : '',
    vote_average: movie ? movie.vote_average : '',
    runtime: movie ? movie.runtime : '',
    tagline: movie ? movie.tagline : '',
    vote_count: movie ? movie.vote_count : 0,
    budget: movie ? movie.budget : 0,
    revenue: movie ? movie.revenue : 0,
  };

  const [singleMovie, setSingleMovie] = useState(initialValue);

  const multiselectRef = React.createRef<Multiselect>();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const updatedSingleMovie = {
      ...singleMovie,
      id: movie ? movie.id : undefined,
      vote_average: Number(singleMovie.vote_average),
      runtime: Number(singleMovie.runtime),
      tagline: singleMovie.tagline == '' ? undefined : singleMovie.tagline,
    };

    if (addOrEdit === 'Add') {
      const res = await addMovie(updatedSingleMovie);
      if ('error' in res) {
        console.log(res.error);
        dispatch(setIsThereErrorInResult(true));
      }
      dispatch(setIsAddModalOpen(false));
      dispatch(setIsAddResultModalOpen(true));
    } else {
      const res = await updateMovie(updatedSingleMovie);
      if (!('error' in res)) {
        if (
          movieForDetailsView &&
          movieForDetailsView.id === updatedSingleMovie.id
        ) {
          dispatch(setSelectedMovie(updatedSingleMovie));
        }
      } else {
        console.log(res.error);
        dispatch(setIsThereErrorInResult(true));
      }
      dispatch(setIsEditResultModalOpen(true));
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
            required
          />
        </div>
        <div className="form__control">
          <label htmlFor="movie_poster_path">Movie URL</label>
          <input
            type="text"
            name="movie_poster_path"
            id="movie_poster_path"
            placeholder="https://"
            value={singleMovie.poster_path}
            onChange={(e) =>
              setSingleMovie({ ...singleMovie, poster_path: e.target.value })
            }
            required
          />
        </div>
        <div className="form__control genre">
          <label htmlFor="genre">Genre</label>
          <Multiselect
            className="multiselect"
            isObject={false}
            options={genres}
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
            value={singleMovie.release_date!}
            onChange={(e) =>
              setSingleMovie({ ...singleMovie, release_date: e.target.value })
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
            value={singleMovie.vote_average!}
            onChange={(e) =>
              setSingleMovie({ ...singleMovie, vote_average: e.target.value })
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
            required
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
          required
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
