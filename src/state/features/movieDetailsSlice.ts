import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Movie from '../../types/Movie';

interface MovieDetailsState {
  selectedMovie: Movie | null;
}

const initialState: MovieDetailsState = {
  selectedMovie: null,
};

export const movieDetailsSlice = createSlice({
  name: 'movieDetailsSlice',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setSelectedMovie } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
