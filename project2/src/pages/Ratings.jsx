// pages/Ratings.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRatedList, removeRating } from '../utils/storage';
import { posterUrl } from '../api/tmdb';
import { RatingStars, Toast } from '../components/UI';

const FB = 'https://via.placeholder.com/48x72/eeede8/9a9690?text=?';
const SORT_OPTS = [
  { value: 'recent',  label: 'Recently Rated' },
  { value: 'highest', label: 'Highest Score' },
  { value: 'lowest',  label: 'Lowest Score' },
  { value: 'title',   label: 'Title A–Z' },
];

function Ratings() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [sortBy,  setSortBy]  = useState('recent');
  const [toast,   setToast]   = useState(null);

  useEffect(() => { setRatings(getRatedList()); }, []);
  const refresh = () => setRatings(getRatedList());

  const handleRemove = (m) => {
    removeRating(m.id);
    refresh();
    setToast({ message: `Rating removed for "${m.title}"`, type: 'error' });
  };

  const sorted = [...ratings].sort((a, b) => {
    if (sortBy === 'recent')  return b.ratedAt - a.ratedAt;
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest')  return a.rating - b.rating;
    if (sortBy === 'title')   return a.title.localeCompare(b.title);
    return 0;
  });

  const avg = ratings.length ? (ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1) : null;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>My Ratings</h1>
          <p>Movies you've scored</p>
        </div>

        {ratings.length > 0 && (
          <div className="stats-row" style={{ marginBottom: 28 }}>
            <div className="stat-card">
              <div className="stat-card__icon">🎬</div>
              <div className="stat-card__value">{ratings.length}</div>
              <div className="stat-card__label">Movies Rated</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">⭐</div>
              <div className="stat-card__value">{avg}</div>
              <div className="stat-card__label">Average Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">🏆</div>
              <div className="stat-card__value">{ratings.filter(r => r.rating >= 8).length}</div>
              <div className="stat-card__label">Rated 8 or Above</div>
            </div>
          </div>
        )}

        {ratings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">⭐</div>
            <h2>No ratings yet</h2>
            <p>Open a movie and tap the stars to rate it</p>
            <button className="btn btn-primary" onClick={() => navigate('/movies')}>Browse Movies</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <div className="form-group" style={{ width: 200 }}>
                <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sorted.map(m => (
                <div key={m.id} className="rating-item">
                  <div className="rating-item__poster" onClick={() => navigate(`/movie/${m.id}`)}>
                    <img
                      src={m.poster_path ? posterUrl(m.poster_path, 'w92') : FB}
                      alt={m.title}
                      onError={e => { e.target.src = FB; }}
                    />
                  </div>
                  <div className="rating-item__info">
                    <div className="rating-item__title" onClick={() => navigate(`/movie/${m.id}`)}>
                      {m.title}
                    </div>
                    <div className="rating-item__year">{m.release_date?.slice(0, 4)}</div>
                    <RatingStars rating={m.rating} readonly />
                    <div style={{ fontSize: '11px', color: 'var(--ink-faint)', marginTop: 4 }}>
                      Rated {new Date(m.ratedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="rating-item__score">
                    {m.rating}
                    <span>/ 10</span>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemove(m)}>Remove</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Ratings;
