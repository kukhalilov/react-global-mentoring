import './App.scss';
import Navbar from './components/navbar/Navbar';
import MovieList from './components/movieList/MovieList';
import ErrorBoundary from './utils/ErrorBoundary';
import AddEditModal from './components/addEditModal/AddEditModal';
import Footer from './components/footer/Footer';
import ResultModal from './components/resultModal/ResultModal';
import MovieDetails from './components/movieDetails/MovieDetails';
import Logo from './components/logo/Logo';
import { RootState } from './state/store';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAddModalOpen } from './state/features/modalsSlice';

const App = () => {
  const movieForDetailsView = useSelector(
    (state: RootState) => state.movieDetails.selectedMovie,
  );
  const modalsState = useSelector((state: RootState) => state.modals);
  const dispatch = useDispatch();

  return (
    <ErrorBoundary>
      <div className="app">
        <>
          <div className="top-logo">
            <Logo />
          </div>

          {movieForDetailsView == null ? (
            <>
              <Navbar />
              <div className="add__movie">
                <button
                  className="add__movie__button"
                  onClick={() => {
                    dispatch(setIsAddModalOpen(true));
                  }}
                >
                  + Add Movie
                </button>
                {modalsState.isAddModalOpen && (
                  <AddEditModal addOrEdit={'Add'} />
                )}
                {modalsState.isAddResultModalOpen && (
                  <ResultModal isAdded={true} />
                )}
              </div>
            </>
          ) : (
            <MovieDetails />
          )}
          <hr className="divider" />
          <MovieList />
          <Footer />
        </>
      </div>
    </ErrorBoundary>
  );
};

export default App;
