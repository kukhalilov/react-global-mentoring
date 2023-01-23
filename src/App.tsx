import './App.scss';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import MovieList from './components/movieList/MovieList';
import ErrorBoundary from './utils/ErrorBoundary';
import AddEditModal from './components/addEditModal/AddEditModal';
import Footer from './components/footer/Footer';
import moviesData from './data';
import { MovieInfo } from './components/addEditForm/AddEditForm';
import ResultModal from './components/resultModal/ResultModal';
import MovieDetails from './components/movieDetails/MovieDetails';
import Logo from './components/logo/Logo';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState<MovieInfo[]>(moviesData);
  const [show, setShow] = useState(false);
  const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState(false);
  const [movieWithDetails, setMovieWithDetails] = useState<MovieInfo | null>(
    null,
  );

  const addMovie = (movie: MovieInfo) => {
    setMovies([...movies, movie]);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="top-logo">
          <Logo />
        </div>

        {isMovieDetailsOpen ? (
          <MovieDetails
            setIsMovieDetailsOpen={setIsMovieDetailsOpen}
            movie={movieWithDetails}
          />
        ) : (
          <>
            <Navbar />
            <div className="add__movie">
              <button
                className="add__movie__button"
                onClick={() => setIsOpen(true)}
              >
                + Add Movie
              </button>
              {isOpen && (
                <AddEditModal
                  setIsOpen={setIsOpen}
                  addOrEdit={'Add'}
                  addMovie={addMovie}
                  movies={movies}
                  setShow={setShow}
                />
              )}
              {show && <ResultModal setShow={setShow} isAdded={true} />}
            </div>
          </>
        )}

        <hr className="divider" />

        <MovieList
          movies={movies}
          setMovies={setMovies}
          setIsMovieDetailsOpen={setIsMovieDetailsOpen}
          setMovieWithDetails={setMovieWithDetails}
          movieWithDetails={movieWithDetails}
        />

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
