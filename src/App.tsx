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
  const [isAddMovieModalOpen, setIsAddEditModalOpen] = useState(false);
  const [movies, setMovies] = useState<MovieInfo[]>(moviesData);
  const [isAddEditResultModalOpen, setIsAddEditResultModalOpen] =
    useState(false);
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
                onClick={() => setIsAddEditModalOpen(true)}
              >
                + Add Movie
              </button>
              {isAddMovieModalOpen && (
                <AddEditModal
                  setIsAddEditModalOpen={setIsAddEditModalOpen}
                  addOrEdit={'Add'}
                  addMovie={addMovie}
                  movies={movies}
                  setIsAddEditResultModalOpen={setIsAddEditResultModalOpen}
                />
              )}
              {isAddEditResultModalOpen && (
                <ResultModal
                  setIsAddEditResultModalOpen={setIsAddEditResultModalOpen}
                  isAdded={true}
                />
              )}
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
