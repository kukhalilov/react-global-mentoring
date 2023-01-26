import { MovieInfo } from '../components/addEditForm/AddEditForm';

export const ACTIONS = {
  ADD_MOVIE: 'ADD_MOVIE',
  EDIT_MOVIE: 'EDIT_MOVIE',
  DELETE_MOVIE: 'DELETE_MOVIE',
  SET_MOVIE_FOR_DETAILS_VIEW: 'SET_MOVIE_FOR_DETAILS_VIEW',
  SET_IS_MOVIE_DETAILS_OPEN: 'SET_IS_MOVIE_DETAILS_OPEN',
  SET_IS_ADD_MODAL_OPEN: 'SET_IS_ADD_MODAL_OPEN',
  SET_IS_ADD_RESULT_MODAL_OPEN: 'SET_IS_ADD_RESULT_MODAL_OPEN',
};

export type Action = {
  type: string;
  payload: unknown;
};

export type State = {
  movies: MovieInfo[];
  movieForDetailsView: MovieInfo | null;
  isAddModalOpen: boolean;
  isAddResultModalOpen: boolean;
  isMovieDetailsOpen: boolean;
};

const MovieReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload as MovieInfo],
      };
    case ACTIONS.EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie.id === (action.payload as MovieInfo).id) {
            return action.payload as MovieInfo;
          }
          return movie;
        }),
      };
    case ACTIONS.DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(
          (movie) => movie.id !== (action.payload as number),
        ),
      };
    case ACTIONS.SET_MOVIE_FOR_DETAILS_VIEW:
      return {
        ...state,
        movieForDetailsView: action.payload as MovieInfo,
      };
    case ACTIONS.SET_IS_MOVIE_DETAILS_OPEN:
      return {
        ...state,
        isMovieDetailsOpen: action.payload as boolean,
      };
    case ACTIONS.SET_IS_ADD_MODAL_OPEN:
      return {
        ...state,
        isAddModalOpen: action.payload as boolean,
      };
    case ACTIONS.SET_IS_ADD_RESULT_MODAL_OPEN:
      return {
        ...state,
        isAddResultModalOpen: action.payload as boolean,
      };
    default:
      return state;
  }
};

export default MovieReducer;
