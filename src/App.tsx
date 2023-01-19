import './App.scss';
import Navbar from './components/navbar/Navbar';
import MovieList from './components/movieList/MovieList';
import ErrorBoundary from './utils/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <div className="app">
      <Navbar />
      <MovieList />
    </div>
  </ErrorBoundary>
);

export default App;
