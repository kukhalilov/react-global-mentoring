import './Sort.scss';
import { useSearchParams } from 'react-router-dom';

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('sortBy', e.target.value);
    setSearchParams(updatedSearchParams.toString());
  };

  return (
    <div className="sort">
      <span className="sort__title">Sort by</span>
      <select name="sort-by" id="sort-by" onChange={handleChange}>
        <option value="release_date">release date</option>
        <option value="vote_average">rating</option>
        <option value="title">name</option>
      </select>
    </div>
  );
};

export default Sort;
