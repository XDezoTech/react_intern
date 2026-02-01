// pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPopularMovies, getNowPlaying, getTopRated,
  getUpcoming, getGenres, backdropUrl,
} from '../api/tmdb';
import { addToWatchlist } from '../utils/storage';
import MovieCard from '../components/MovieCard';
import { Loader, Toast } from '../components/UI';

// One Netflix-style horizontal row section
function Row({ title, movies, onAdd, linkTo }) {
  const navigate = useNavigate();
  if (!movies.length) return null;
  return (
    <section className="flick-row-section">
      <div className="container">
        <div className="section-heading">
          <h2>{title}</h2>
          {linkTo && <button onClick={() => navigate(linkTo)}>See all →</button>}
        </div>
        <div className="flick-row">
          {movies.map(m => (
            <MovieCard key={m.id} movie={m} onAdd={onAdd} variant="row" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const navigate = useNavigate();
  const [hero,       setHero]       = useState(null);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular,    setPopular]    = useState([]);
  const [topRated,   setTopRated]   = useState([]);
  const [upcoming,   setUpcoming]   = useState([]);
  const [genres,     setGenres]     = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [toast,      setToast]      = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [pop, now, top, up, gen] = await Promise.all([
          getPopularMovies(), getNowPlaying(), getTopRated(), getUpcoming(), getGenres(),
        ]);
        setPopular(pop.results || []);
        setNowPlaying(now.results || []);
        setTopRated(top.results || []);
        setUpcoming(up.results || []);
        setGenres(gen.genres || []);
        const arr = pop.results || [];
        if (arr.length) setHero(arr[Math.floor(Math.random() * Math.min(5, arr.length))]);
      } catch (e) {
        setError('Could not load movies. Please check your API key in src/api/tmdb.js');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = (movie) => {
    addToWatchlist(movie);
    setToast({ message: `Added "${movie.title}" to watchlist`, type: 'success' });
  };

  const filteredPopular = activeGenre
    ? popular.filter(m => m.genre_ids?.includes(activeGenre))
    : popular;

  if (loading) return <div className="page-wrapper"><Loader text="Loading FlickVault…" /></div>;

  if (error) return (
    <div className="page-wrapper" style={{ padding: '60px 32px' }}>
      <div className="container"><div className="error-box">{error}</div></div>
    </div>
  );

  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      {hero && (
        <section className="hero">
          <div className="hero__backdrop">
            {backdropUrl(hero.backdrop_path) && (
              <img src={backdropUrl(hero.backdrop_path)} alt={hero.title} />
            )}
          </div>
          <div className="hero__gradient" />
          <div className="container">
            <div className="hero__content">
              <div className="hero__label">Featured Film</div>
              <h1 className="hero__title">{hero.title}</h1>
              <div className="hero__meta">
                <span className="hero__meta-pill gold">⭐ {hero.vote_average?.toFixed(1)}</span>
                <span className="hero__meta-pill">📅 {hero.release_date?.slice(0,4)}</span>
                <span className="hero__meta-pill">👥 {hero.vote_count?.toLocaleString()} votes</span>
              </div>
              <p className="hero__overview">{hero.overview}</p>
              <div className="hero__actions">
                <button className="btn btn-primary btn-lg" onClick={() => navigate(`/movie/${hero.id}`)}>
                  View Details
                </button>
                <button className="btn btn-outline btn-lg" onClick={() => handleAdd(hero)}>
                  + Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── NOW PLAYING ROW ── */}
      <Row title="Now Playing" movies={nowPlaying.slice(0, 16)} onAdd={handleAdd} linkTo="/movies" />

      {/* ── POPULAR + GENRE FILTER ── */}
      <section className="flick-row-section">
        <div className="container">
          <div className="section-heading">
            <h2>Popular Movies</h2>
            <button onClick={() => navigate('/movies')}>See all →</button>
          </div>

          {/* Genre filter pills */}
          <div className="genre-tags" style={{ marginBottom: '18px' }}>
            <button
              className={`genre-tag ${activeGenre === null ? 'active' : ''}`}
              onClick={() => setActiveGenre(null)}
            >All</button>
            {genres.slice(0, 12).map(g => (
              <button
                key={g.id}
                className={`genre-tag ${activeGenre === g.id ? 'active' : ''}`}
                onClick={() => setActiveGenre(activeGenre === g.id ? null : g.id)}
              >{g.name}</button>
            ))}
          </div>

          {/* Horizontal row */}
          <div className="flick-row">
            {filteredPopular.slice(0, 16).map(m => (
              <MovieCard key={m.id} movie={m} onAdd={handleAdd} />
            ))}
          </div>
          {filteredPopular.length === 0 && (
            <p style={{ color: 'var(--ink-muted)', padding: '24px 0', fontSize: '14px' }}>
              No movies for this genre in the current list.
            </p>
          )}
        </div>
      </section>

      {/* ── TOP RATED ROW ── */}
      <Row title="Top Rated" movies={topRated.slice(0, 16)} onAdd={handleAdd} linkTo="/movies" />

      {/* ── COMING SOON ROW ── */}
      <Row title="Coming Soon" movies={upcoming.slice(0, 16)} onAdd={handleAdd} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Home;
