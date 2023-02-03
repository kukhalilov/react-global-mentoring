import Movie from './Movie';

export default interface MoviesResponse {
  data: Movie[];
  total?: number;
  totalAmount?: number;
  offset: number;
  limit: number;
}
