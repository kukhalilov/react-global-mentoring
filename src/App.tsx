import './App.scss';
import Navbar from './components/navbar/Navbar';
import MovieList from './components/movieList/MovieList';

const App = () => (
  <div className="app">
    <Navbar />
    <MovieList />
  </div>
);

export default App;
