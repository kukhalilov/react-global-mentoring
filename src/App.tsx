import './App.scss';
import { useContext } from 'react';
import Navbar from './components/navbar/Navbar';
import MovieList from './components/movieList/MovieList';
import ErrorBoundary from './utils/ErrorBoundary';
import AddEditModal from './components/addEditModal/AddEditModal';
import Footer from './components/footer/Footer';
import ResultModal from './components/resultModal/ResultModal';
import MovieDetails from './components/movieDetails/MovieDetails';
import Logo from './components/logo/Logo';
import MovieContextProvider, { MovieContext } from './context/MovieContext';
import { ACTIONS } from './context/MovieReducer';

const HomePage = () => {
  const { state, dispatch } = useContext(MovieContext);

  return (
    <>
      <div className="top-logo">
        <Logo />
      </div>

      {state.isMovieDetailsOpen ? (
        <MovieDetails />
      ) : (
        <>
          <Navbar />
          <div className="add__movie">
            <button
              className="add__movie__button"
              onClick={() => {
                dispatch({
                  type: ACTIONS.SET_IS_ADD_MODAL_OPEN,
                  payload: true,
                });
              }}
            >
              + Add Movie
            </button>
            {state.isAddModalOpen && <AddEditModal addOrEdit={'Add'} />}
            {state.isAddResultModalOpen && <ResultModal isAdded={true} />}
          </div>
        </>
      )}
      <hr className="divider" />
      <MovieList />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <MovieContextProvider>
        <div className="app">
          <HomePage />
        </div>
      </MovieContextProvider>
    </ErrorBoundary>
  );
};

export default App;
