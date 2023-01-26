import './Navbar.scss';
import AddMovie from '../addMovie/AddMovie';
import Search from '../search/Search';

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="navbar__overlay">
        <div className="navbar__top">
          <div className="navbar__logo">
            <span>netflix</span>
            <span>roulette</span>
          </div>
          <div className="navbar__add-movie">
            <AddMovie />
          </div>
        </div>

        <div className="navbar__bottom">
          <h1>Find your movie</h1>
          <Search />
        </div>
      </div>
      <hr className="divider" />
    </section>
  );
};

export default Navbar;
