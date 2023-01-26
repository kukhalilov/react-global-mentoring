import './Sort.scss';

const Sort = () => {
  return (
    <div className="sort">
      <span className="sort__title">Sort by</span>
      <select name="sort-by" id="sort-by">
        <option value="release-date">release date</option>
        <option value="rating">rating</option>
      </select>
    </div>
  );
};

export default Sort;
