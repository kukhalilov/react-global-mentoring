import modalsSliceReducer, {
  setIsAddModalOpen,
  setEditModalMovie,
  setDeleteModalMovie,
  setIsAddResultModalOpen,
  setIsEditResultModalOpen,
  setIsDeleteResultModalOpen,
  setIsThereErrorInResult,
  initialState,
} from '../state/features/modalsSlice';

const mockMovie = {
  id: 1,
  title: 'test',
  release_date: '2020-01-01',
  poster_path: 'test',
  genres: ['test'],
  overview: 'test',
  runtime: 100,
  vote_average: 10,
};

describe('modalsSliceReducer', () => {
  test('should handle setIsAddModalOpen', () => {
    const actual = modalsSliceReducer(initialState, setIsAddModalOpen(true));
    expect(actual.isAddModalOpen).toEqual(true);
  });

  test('should handle setEditModalMovie', () => {
    const actual = modalsSliceReducer(
      initialState,
      setEditModalMovie(mockMovie),
    );
    expect(actual.editModalMovie).toEqual(mockMovie);
  });

  test('should handle setDeleteModalMovie', () => {
    const actual = modalsSliceReducer(
      initialState,
      setDeleteModalMovie(mockMovie),
    );
    expect(actual.deleteModalMovie).toEqual(mockMovie);
  });

  test('should handle setIsAddResultModalOpen', () => {
    const actual = modalsSliceReducer(
      initialState,
      setIsAddResultModalOpen(true),
    );
    expect(actual.isAddResultModalOpen).toEqual(true);
  });

  test('should handle setIsEditResultModalOpen', () => {
    const actual = modalsSliceReducer(
      initialState,
      setIsEditResultModalOpen(true),
    );
    expect(actual.isEditResultModalOpen).toEqual(true);
  });

  test('should handle setIsDeleteResultModalOpen', () => {
    const actual = modalsSliceReducer(
      initialState,
      setIsDeleteResultModalOpen(true),
    );
    expect(actual.isDeleteResultModalOpen).toEqual(true);
  });

  test('should handle setIsThereErrorInResult', () => {
    const actual = modalsSliceReducer(
      initialState,
      setIsThereErrorInResult(true),
    );
    expect(actual.isThereErrorInResult).toEqual(true);
  });
});
