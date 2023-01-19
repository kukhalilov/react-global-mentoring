import './App.scss';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import MovieList from './components/movieList/MovieList';
import ErrorBoundary from './utils/ErrorBoundary';
import Modal from './components/addModal/AddModal';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar />
        <MovieList />
        <div className="add__movie">
          <button
            className="add__movie__button"
            onClick={() => setIsOpen(true)}
          >
            + Add Movie
          </button>
          {isOpen && <Modal setIsOpen={setIsOpen} />}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
