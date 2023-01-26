import './Navbar.scss';
import Search from '../search/Search';

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="navbar__overlay">
        <div className="navbar__content">
          <h1>Find your movie</h1>
          <Search />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
