// pages/Movies.jsx
import { useState, useEffect } from 'react';
import { discoverMovies, getGenres } from '../api/tmdb';
import { addToWatchlist } from '../utils/storage';
import MovieCard from '../components/MovieCard';
import { Loader, Toast } from '../components/UI';

const SORT_OPTIONS = [
  { value: 'popularity.desc',    label: 'Most Popular' },
  { value: 'vote_average.desc',  label: 'Highest Rated' },
  { value: 'release_date.desc',  label: 'Newest First' },
  { value: 'release_date.asc',   label: 'Oldest First' },
  { value: 'title.asc',          label: 'Title A–Z' },
];
const RATING_OPTIONS = [
  { value: '',  label: 'Any Rating' },
  { value: '9', label: '9+ ⭐' },
  { value: '8', label: '8+ ⭐' },
  { value: '7', label: '7+ ⭐' },
  { value: '6', label: '6+ ⭐' },
];

function Movies() {
  const [movies,  setMovies]  = useState([]);
  const [genres,  setGenres]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [page,    setPage]    = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast,   setToast]   = useState(null);

  const [genre,   setGenre]   = useState('');
  const [year,    setYear]    = useState('');
  const [rating,  setRating]  = useState('');
  const [sortBy,  setSortBy]  = useState('popularity.desc');

  useEffect(() => {
    getGenres().then(d => setGenres(d.genres || [])).catch(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const params = { sort_by: sortBy, page };
        if (genre)  params.with_genres = genre;
        if (year)   { params.primary_release_date_gte = `${year}-01-01`; params.primary_release_date_lte = `${year}-12-31`; }
        if (rating) params['vote_average.gte'] = rating;

        const data = await discoverMovies(params);
        if (page === 1) setMovies(data.results || []);
        else setMovies(prev => [...prev, ...(data.results || [])]);
        setTotalPages(data.total_pages || 1);
      } catch {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    })();
  }, [genre, year, rating, sortBy, page]);

  const setFilter = (setter, val) => { setter(val); setPage(1); };
  const reset = () => { setGenre(''); setYear(''); setRating(''); setSortBy('popularity.desc'); setPage(1); };
  const handleAdd = (movie) => { addToWatchlist(movie); setToast({ message: `"${movie.title}" added!`, type: 'success' }); };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Browse Movies</h1>
          <p>Explore thousands of films from every genre and era</p>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <div className="form-group">
            <label className="form-label">Genre</label>
            <select className="form-select" value={genre} onChange={e => setFilter(setGenre, e.target.value)}>
              <option value="">All Genres</option>
              {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Year</label>
            <input
              type="number" className="form-input"
              placeholder="e.g. 2023" min="1900" max={new Date().getFullYear()}
              value={year} onChange={e => setFilter(setYear, e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Min Rating</label>
            <select className="form-select" value={rating} onChange={e => setFilter(setRating, e.target.value)}>
              {RATING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Sort By</label>
            <select className="form-select" value={sortBy} onChange={e => setFilter(setSortBy, e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <button className="reset-btn" onClick={reset}>↺ Reset</button>
        </div>

        {error && <div className="error-box" style={{ marginBottom: 20 }}>{error}</div>}

        {loading && page === 1 ? <Loader /> : (
          <>
            <div className="movies-grid">
              {movies.map(m => (
                <MovieCard key={m.id} movie={m} onAdd={handleAdd} variant="grid" />
              ))}
            </div>

            {movies.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-state__icon">🎬</div>
                <h2>No Movies Found</h2>
                <p>Try adjusting your filters</p>
                <button className="btn btn-primary" onClick={reset}>Clear Filters</button>
              </div>
            )}

            {loading && page > 1 && (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <div className="loader" style={{ margin: '0 auto' }} />
              </div>
            )}

            {movies.length > 0 && page < totalPages && !loading && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <button className="btn btn-outline btn-lg" onClick={() => setPage(p => p + 1)}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Movies;
