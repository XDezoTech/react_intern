// pages/Search.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import { addToWatchlist } from '../utils/storage';
import MovieCard from '../components/MovieCard';
import { Loader, Toast } from '../components/UI';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query,    setQuery]    = useState(searchParams.get('q') || '');
  const [results,  setResults]  = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(false);
  const [searched, setSearched] = useState(false);
  const [error,    setError]    = useState(null);
  const [toast,    setToast]    = useState(null);

  // Run search if URL has ?q=
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) doSearch(q);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doSearch = async (q) => {
    if (!q.trim()) return;
    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const data = await searchMovies(q);
      setResults(data.results || []);
      setTotal(data.total_results || 0);
      setSearchParams({ q });
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (movie) => {
    addToWatchlist(movie);
    setToast({ message: `"${movie.title}" added!`, type: 'success' });
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="search-header">
          <h1>Search</h1>
          <p>Find any movie in the TMDB database</p>

          {/* Search bar */}
          <div className="search-bar">
            <div className="search-bar-input">
              <input
                type="text"
                placeholder="Type a movie title…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSearch(query)}
                autoFocus
              />
              {query && (
                <button className="clear-btn" onClick={() => { setQuery(''); setResults([]); setSearched(false); setSearchParams({}); }}>✕</button>
              )}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => doSearch(query)}
              disabled={!query.trim() || loading}
            >
              Search
            </button>
          </div>
        </div>

        {error && <div className="error-box" style={{ marginBottom: 20 }}>{error}</div>}

        {loading && <Loader text="Searching…" />}

        {!loading && searched && (
          <>
            {results.length > 0 && (
              <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '20px' }}>
                {total.toLocaleString()} results for <strong style={{ color: 'var(--ink)' }}>"{query}"</strong>
              </p>
            )}

            {results.length > 0 ? (
              <div className="movies-grid">
                {results.map(m => (
                  <MovieCard key={m.id} movie={m} onAdd={handleAdd} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state__icon">🔍</div>
                <h2>No results found</h2>
                <p>Try a different search term</p>
              </div>
            )}
          </>
        )}

        {!searched && !loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-faint)' }}>
            <div style={{ fontSize: '40px', marginBottom: '14px' }}>🎬</div>
            <p style={{ fontSize: '14px' }}>Type a title and press Enter or Search</p>
          </div>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Search;
