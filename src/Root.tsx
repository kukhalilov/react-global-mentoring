import React from 'react';
import Footer from './components/footer/Footer';
import Logo from './components/logo/Logo';
import MovieList from './components/movieList/MovieList';
import './Root.scss';
import { useSearchParams } from 'react-router-dom';
import Header from './components/header/Header';
import MovieDetails from './components/movieDetails/MovieDetails';

const Root = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get('movie');
  return (
    <div className="root search__page">
      <div className="top-logo">
        <Logo />
      </div>
      {movieId ? <MovieDetails /> : <Header />}
      <hr className="divider" />
      <MovieList />
      <Footer />
    </div>
  );
};

export default Root;
