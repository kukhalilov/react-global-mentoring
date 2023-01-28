import './Sort.scss';
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../../state/features/movieDetailsSlice';

interface SortProps {
  setSort: (a: string) => void;
}

const Sort: React.FC<SortProps> = ({ setSort }) => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    dispatch(setSelectedMovie(null));
  };
  return (
    <div className="sort">
      <span className="sort__title">Sort by</span>
      <select name="sort-by" id="sort-by" onChange={handleChange}>
        <option value="release_date">release date</option>
        <option value="vote_average">rating</option>
      </select>
    </div>
  );
};

export default Sort;
