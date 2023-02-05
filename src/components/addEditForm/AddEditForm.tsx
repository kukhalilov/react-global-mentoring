import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import './AddEditForm.scss';
import { RootState } from '../../state/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsAddModalOpen,
  setIsAddResultModalOpen,
  setIsEditResultModalOpen,
  setIsThereErrorInResult,
} from '../../state/features/modalsSlice';
import {
  useAddMovieMutation,
  useUpdateMovieMutation,
} from '../../state/api/moviesApi';
import { genres } from '../genres/Genres';
import { Formik, Form, Field, ErrorMessage, ErrorMessageProps } from 'formik';
import * as Yup from 'yup';

interface AddEditFormProps {
  addOrEdit?: string;
}

const AddEditForm: React.FC<AddEditFormProps> = ({ addOrEdit }) => {
  const dispatch = useDispatch();

  const movie = useSelector((state: RootState) => state.modals.editModalMovie);
  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();

  const multiselectRef = React.createRef<HTMLDivElement>();
  const formRef = React.createRef<HTMLFormElement>();

  const [isGenresTouched, setIsGenresTouched] = useState(false);

  useEffect(() => {
    const multiselect = multiselectRef.current;
    const form = formRef.current;

    const setGenresTouchedOnFormClick = (e: MouseEvent) => {
      if (!multiselect?.contains(e.target as Node)) {
        setIsGenresTouched(true);
      }
    };
    const setGenresTouchedOnClick = () => {
      form?.addEventListener('click', setGenresTouchedOnFormClick);
    };

    multiselect?.addEventListener('click', setGenresTouchedOnClick);
    return () => {
      multiselect?.removeEventListener('click', setGenresTouchedOnClick);
      form?.removeEventListener('click', setGenresTouchedOnFormClick);
    };
  });

  const initialValue = {
    title: movie && movie.title ? movie.title : '',
    poster_path: movie && movie.poster_path ? movie.poster_path : '',
    release_date: movie && movie.release_date ? movie.release_date : '',
    overview: movie && movie.overview ? movie.overview : '',
    vote_average: movie && movie.vote_average ? movie.vote_average : '',
    runtime: movie && movie.runtime ? movie.runtime : '',
  };

  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    movie ? movie.genres : [],
  );

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    poster_path: Yup.string().required('Required').url('Must be a valid URL'),
    release_date: Yup.string().required('Required'),
    overview: Yup.string().required('Required'),
    vote_average: Yup.number()
      .min(0, 'Must be greater than 0')
      .max(10, 'Must be less than 10'),
    runtime: Yup.number().required('Required').min(0, 'Must be greater than 0'),
  });

  const CustomMultiselect = () => {
    return (
      <Multiselect
        className="multiselect"
        isObject={false}
        options={genres.map(
          (genre) =>
            genre.charAt(0)?.toUpperCase() + genre.slice(1).toLowerCase(),
        )}
        showCheckbox={true}
        displayValue="name"
        placeholder="Select Genre"
        style={{ chips: { background: '#f65261' } }}
        selectedValues={selectedGenres}
        onSelect={(selectedList: string[]) => {
          setSelectedGenres(selectedList);
        }}
        onRemove={(selectedList: string[]) => {
          setSelectedGenres(selectedList);
          setIsGenresTouched(true);
        }}
      />
    );
  };

  const CustomErrorMessage = (props: ErrorMessageProps) => {
    return (
      <div className="error-message">
        <ErrorMessage {...props} />
      </div>
    );
  };

  const onSubmit = async (values: typeof initialValue) => {
    const updatedMovie = {
      ...values,
      id: movie ? movie.id : undefined,
      vote_average: Number(values.vote_average),
      runtime: Number(values.runtime),
      genres: selectedGenres,
      tagline: undefined,
      vote_count: movie ? movie.vote_count : undefined,
      budget: movie ? movie.budget : undefined,
      revenue: movie ? movie.revenue : undefined,
    };

    if (addOrEdit === 'Add' && selectedGenres.length > 0) {
      const res = await addMovie(updatedMovie);
      if ('error' in res) {
        dispatch(setIsThereErrorInResult(true));
      }
      dispatch(setIsAddModalOpen(false));
      dispatch(setIsAddResultModalOpen(true));
    } else if (addOrEdit === 'Edit' && selectedGenres.length > 0) {
      const res = await updateMovie(updatedMovie);
      if ('error' in res) {
        dispatch(setIsThereErrorInResult(true));
      }
      dispatch(setIsEditResultModalOpen(true));
    }
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onReset={() => {
        setIsGenresTouched(false);
      }}
    >
      <Form className="form" ref={formRef}>
        <div className="form__group">
          <div className="form__control">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" id="title" placeholder="Moana" />
            <CustomErrorMessage name="title" />
          </div>
          <div className="form__control">
            <label htmlFor="movie_poster_path">Movie URL</label>
            <Field
              type="text"
              name="poster_path"
              id="movie_poster_path"
              placeholder="https://"
            />
            <CustomErrorMessage name="poster_path" />
          </div>
          <div className="form__control__genre">
            <label htmlFor="genre">Genre</label>
            <div ref={multiselectRef}>
              <CustomMultiselect />
            </div>
            {selectedGenres.length === 0 && isGenresTouched && (
              <div className="error-message">Select at least one genre</div>
            )}
          </div>
        </div>

        <div className="form__group">
          <div className="form__control">
            <label htmlFor="release_date">Release Date</label>
            <Field
              type="date"
              name="release_date"
              id="release_date"
              placeholder="Select Date"
            />
            <CustomErrorMessage name="release_date" />
          </div>
          <div className="form__control">
            <label htmlFor="rating">Rating</label>
            <Field
              type="number"
              name="vote_average"
              id="rating"
              placeholder="7.8"
            />
            <CustomErrorMessage name="vote_average" />
          </div>
          <div className="form__control">
            <label htmlFor="runtime">Runtime</label>
            <Field
              type="number"
              name="runtime"
              id="runtime"
              placeholder="minutes"
            />
            <CustomErrorMessage name="runtime" />
          </div>
        </div>

        <div className="overview">
          <label htmlFor="overview">Overview</label>
          <Field
            as="textarea"
            name="overview"
            id="overview"
            placeholder="Movie description"
          />
          <CustomErrorMessage name="overview" />
        </div>
        <div className="form__footer">
          <button type="reset">Reset</button>
          <button type="submit" onClick={() => setIsGenresTouched(true)}>
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddEditForm;
