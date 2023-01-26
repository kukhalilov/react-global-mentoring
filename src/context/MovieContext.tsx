// movie context
import { createContext, Reducer, useReducer } from 'react';
import MovieReducer, { State, Action } from './MovieReducer';
import moviesData from '../data';

export const initialState: State = {
  movies: moviesData,
  movieForDetailsView: null,
  isAddModalOpen: false,
  isAddResultModalOpen: false,
  isMovieDetailsOpen: false,
};

export const MovieContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const MovieContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    MovieReducer,
    initialState,
  );

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
