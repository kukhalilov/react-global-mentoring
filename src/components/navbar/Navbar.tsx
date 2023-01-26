import './Navbar.scss';
import Search from '../search/Search';
import Logo from '../logo/Logo';

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="navbar__overlay">
        <div className="navbar__top">
          <Logo />
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
