import { configureStore } from '@reduxjs/toolkit';
import modalsReducer from './features/modalsSlice';
import movieDetailsReducer from './features/movieDetailsSlice';
import { moviesApi } from './api/moviesApi';

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    movieDetails: movieDetailsReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
