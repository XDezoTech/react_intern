// pages/Watchlist.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist, removeFromWatchlist, toggleWatched } from '../utils/storage';
import { getNote } from '../utils/storage';
import { posterUrl } from '../api/tmdb';
import { Toast } from '../components/UI';

const FB = 'https://via.placeholder.com/48x72/eeede8/9a9690?text=?';
const TABS = [
  { key: 'all',       label: 'All' },
  { key: 'unwatched', label: 'To Watch' },
  { key: 'watched',   label: 'Watched' },
];

function Watchlist() {
  const navigate = useNavigate();
  const [list,  setList]  = useState([]);
  const [tab,   setTab]   = useState('all');
  const [toast, setToast] = useState(null);

  useEffect(() => { setList(getWatchlist()); }, []);
  const refresh = () => setList(getWatchlist());

  const handleRemove = (m) => { removeFromWatchlist(m.id); refresh(); setToast({ message: `"${m.title}" removed`, type: 'error' }); };
  const handleToggle = (m) => { toggleWatched(m.id); refresh(); setToast({ message: m.watched ? 'Unmarked' : `"${m.title}" marked as watched!`, type: 'success' }); };

  const watched   = list.filter(m => m.watched).length;
  const displayed = list.filter(m => tab === 'watched' ? m.watched : tab === 'unwatched' ? !m.watched : true);

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1>Watchlist</h1>
            <p>{list.length} movies · {watched} watched · {list.length - watched} remaining</p>
          </div>
          <div className="watchlist-tabs">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`watchlist-tab ${tab === t.key ? 'active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
                {t.key === 'all'       && ` (${list.length})`}
                {t.key === 'unwatched' && ` (${list.length - watched})`}
                {t.key === 'watched'   && ` (${watched})`}
              </button>
            ))}
          </div>
        </div>

        {/* Empty */}
        {list.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">📋</div>
            <h2>Your watchlist is empty</h2>
            <p>Browse movies and add them to keep track of what you want to watch</p>
            <button className="btn btn-primary" onClick={() => navigate('/movies')}>Browse Movies</button>
          </div>
        )}
        {list.length > 0 && displayed.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">{tab === 'watched' ? '✅' : '🎬'}</div>
            <h2>{tab === 'watched' ? 'No watched movies yet' : 'All caught up!'}</h2>
            <p>{tab === 'watched' ? 'Mark movies as watched to see them here' : 'All movies are watched!'}</p>
          </div>
        )}

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayed.map(m => {
            const note = getNote(m.id);
            return (
              <div key={m.id} className="watchlist-item">
                {/* Poster */}
                <div className="watchlist-item__poster" onClick={() => navigate(`/movie/${m.id}`)}>
                  <img
                    src={m.poster_path ? posterUrl(m.poster_path, 'w92') : FB}
                    alt={m.title}
                    onError={e => { e.target.src = FB; }}
                  />
                </div>

                {/* Info */}
                <div className="watchlist-item__info">
                  <div className="watchlist-item__title" onClick={() => navigate(`/movie/${m.id}`)}>
                    {m.title}
                    {m.watched && (
                      <span style={{ marginLeft: 8, fontSize: 11, background: 'var(--green-light)', color: 'var(--green)', padding: '2px 7px', borderRadius: 100, fontWeight: 600 }}>
                        ✓ Watched
                      </span>
                    )}
                  </div>
                  <div className="watchlist-item__meta">
                    {m.release_date?.slice(0, 4)} · ⭐ {m.vote_average?.toFixed(1)} · Added {new Date(m.addedAt).toLocaleDateString()}
                  </div>
                  {/* Show note preview if exists */}
                  {note && (
                    <div className="watchlist-item__note" title={note}>
                      📝 {note}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
                  <button className={`btn btn-sm ${m.watched ? 'btn-ghost' : 'btn-success'}`} onClick={() => handleToggle(m)}>
                    {m.watched ? 'Unmark' : '✓ Watched'}
                  </button>
                  <button className="btn btn-sm btn-outline" onClick={() => navigate(`/movie/${m.id}`)}>
                    Details
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemove(m)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Watchlist;
