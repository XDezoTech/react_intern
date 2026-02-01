// components/Footer.jsx
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="logo">
            FlickVault <span className="logo-dot" />
          </div>
          <p>Your personal movie library. Discover, track, rate, and take notes on every film you watch.</p>
        </div>
        <div className="footer__col">
          <h4>Discover</h4>
          <Link to="/">Home</Link>
          <Link to="/movies">Browse</Link>
          <Link to="/search">Search</Link>
        </div>
        <div className="footer__col">
          <h4>Library</h4>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/ratings">My Ratings</Link>
          <Link to="/admin">Dashboard</Link>
        </div>
        <div className="footer__col">
          <h4>Data</h4>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a>
          <a href="https://developers.themoviedb.org/" target="_blank" rel="noreferrer">API Docs</a>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} FlickVault</span>
        <span>Powered by TMDB</span>
      </div>
    </footer>
  );
}

export default Footer;
