// components/Header.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="header__inner">
          {/* Logo */}
          <NavLink to="/" className="header__logo" onClick={close}>
            FlickVault
            <span className="header__logo-dot" />
          </NavLink>

          {/* Desktop nav */}
          <nav className="header__nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/movies">Browse</NavLink>
            <NavLink to="/watchlist">Watchlist</NavLink>
            <NavLink to="/ratings">Ratings</NavLink>
            <NavLink to="/admin">Dashboard</NavLink>
          </nav>

          {/* Right side */}
          <div className="header__right">
            <button
              className="header__search-trigger"
              onClick={() => { navigate('/search'); close(); }}
            >
              <span>🔍</span> Search movies…
            </button>
            <button
              className="header__menu-toggle"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <nav className={`header__mobile-nav ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/movies" onClick={close}>Browse</NavLink>
        <NavLink to="/search" onClick={close}>Search</NavLink>
        <NavLink to="/watchlist" onClick={close}>Watchlist</NavLink>
        <NavLink to="/ratings" onClick={close}>Ratings</NavLink>
        <NavLink to="/admin" onClick={close}>Dashboard</NavLink>
      </nav>
    </>
  );
}

export default Header;
