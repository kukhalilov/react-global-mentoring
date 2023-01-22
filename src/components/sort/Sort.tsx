import './Sort.scss';

interface SortProps {
  setSortState: (a: string) => void;
}

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
