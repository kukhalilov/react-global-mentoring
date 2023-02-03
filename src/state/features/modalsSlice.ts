import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Movie from '../../types/Movie';

interface ModalsState {
  isAddModalOpen: boolean;
  editModalMovie: Movie | null;
  deleteModalMovie: Movie | null;
  isAddResultModalOpen: boolean;
  isEditResultModalOpen: boolean;
  isDeleteResultModalOpen: boolean;
  isThereErrorInResult: boolean;
}

const initialState: ModalsState = {
  isAddModalOpen: false,
  editModalMovie: null,
  deleteModalMovie: null,
  isAddResultModalOpen: false,
  isEditResultModalOpen: false,
  isDeleteResultModalOpen: false,
  isThereErrorInResult: false,
};

export const modalsSlice = createSlice({
  name: 'modalsSlice',
  initialState,
  reducers: {
    setIsAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddModalOpen = action.payload;
    },
    setEditModalMovie: (state, action: PayloadAction<Movie | null>) => {
      state.editModalMovie = action.payload;
    },
    setDeleteModalMovie: (state, action: PayloadAction<Movie | null>) => {
      state.deleteModalMovie = action.payload;
    },
    setIsAddResultModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddResultModalOpen = action.payload;
    },
    setIsEditResultModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditResultModalOpen = action.payload;
    },
    setIsDeleteResultModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteResultModalOpen = action.payload;
    },
    setIsThereErrorInResult: (state, action: PayloadAction<boolean>) => {
      state.isThereErrorInResult = action.payload;
    },
  },
});

export const {
  setIsAddModalOpen,
  setEditModalMovie,
  setDeleteModalMovie,
  setIsAddResultModalOpen,
  setIsEditResultModalOpen,
  setIsDeleteResultModalOpen,
  setIsThereErrorInResult,
} = modalsSlice.actions;

export default modalsSlice.reducer;
