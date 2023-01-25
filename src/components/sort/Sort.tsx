import { MovieInfo } from '../addEditForm/AddEditForm';
import './Sort.scss';

interface SortProps {
  setSortState: (a: string) => void;
}

export const sortMethods = {
  date: (a: MovieInfo, b: MovieInfo) => {
    const dateA = new Date(a.date ? a.date : '');
    const dateB = new Date(b.date ? b.date : '');
    return dateB.getTime() - dateA.getTime();
  },
  genre: (a: MovieInfo, b: MovieInfo) => {
    const genreA = a.genres && a.genres[0];
    const genreB = b.genres && b.genres[0];
    if (genreA && genreB && genreA < genreB) {
      return -1;
    }
    if (genreA && genreB && genreA > genreB) {
      return 1;
    }
    return 0;
  },
  rating: (a: MovieInfo, b: MovieInfo) => {
    if (a.rating && b.rating) {
      return +b.rating - +a.rating;
    }
    return 0;
  },
};

const Sort: React.FC<SortProps> = ({ setSortState }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortState(e.target.value);
  };
  return (
    <div className="sort">
      <span className="sort__title">Sort by</span>
      <select name="sort-by" id="sort-by" onChange={handleChange}>
        <option value="date">release date</option>
        <option value="genre">genre</option>
        <option value="rating">rating</option>
      </select>
    </div>
  );
};

export default Sort;
