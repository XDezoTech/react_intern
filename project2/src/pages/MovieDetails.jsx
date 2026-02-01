// pages/MovieDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, posterUrl, backdropUrl, profileUrl } from '../api/tmdb';
import {
  addToWatchlist, removeFromWatchlist, isInWatchlist,
  addRating, getMovieRating,
  saveNote, getNote,
} from '../utils/storage';
import MovieCard from '../components/MovieCard';
import { Loader, Toast, RatingStars } from '../components/UI';

const FB_POSTER  = 'https://via.placeholder.com/380x570/eeede8/9a9690?text=No+Poster';
const FB_PROFILE = 'https://via.placeholder.com/96x116/eeede8/9a9690?text=?';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie,   setMovie]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [toast,   setToast]   = useState(null);

  const [inList,     setInList]     = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [note,       setNote]       = useState('');
  const [editNote,   setEditNote]   = useState(false);
  const [noteInput,  setNoteInput]  = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const data = await getMovieDetails(id);
        setMovie(data);
        setInList(isInWatchlist(Number(id)));
        setUserRating(getMovieRating(Number(id)));
        const saved = getNote(Number(id));
        setNote(saved);
        setNoteInput(saved);
      } catch {
        setError('Could not load this movie.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleToggleWatchlist = () => {
    if (inList) {
      removeFromWatchlist(movie.id);
      setInList(false);
      setToast({ message: 'Removed from watchlist', type: 'error' });
    } else {
      addToWatchlist(movie);
      setInList(true);
      setToast({ message: 'Added to watchlist!', type: 'success' });
    }
  };

  const handleRate = (r) => {
    addRating(movie, r);
    setUserRating(r);
    setToast({ message: `Rated ${r}/10`, type: 'success' });
  };

  const handleSaveNote = () => {
    saveNote(movie.id, noteInput);
    setNote(noteInput.trim());
    setEditNote(false);
    setToast({ message: noteInput.trim() ? 'Note saved!' : 'Note removed', type: 'success' });
  };

  const handleAddFromSimilar = (m) => {
    addToWatchlist(m);
    setToast({ message: `"${m.title}" added!`, type: 'success' });
  };

  const trailerKey = movie?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key;
  const cast    = movie?.credits?.cast?.slice(0, 12) || [];
  const similar = movie?.similar?.results?.slice(0, 10) || [];
  const runtime = movie?.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;

  if (loading) return <div className="page-wrapper"><Loader text="Loading…" /></div>;
  if (error)   return (
    <div className="page-wrapper" style={{ padding: '60px 32px' }}>
      <div className="container">
        <div className="error-box">{error}</div>
        <button className="back-btn" style={{ marginTop: 16 }} onClick={() => navigate(-1)}>← Go back</button>
      </div>
    </div>
  );
  if (!movie) return null;

  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <div className="detail-hero">
        <div className="detail-hero__backdrop">
          {backdropUrl(movie.backdrop_path) && (
            <img src={backdropUrl(movie.backdrop_path)} alt={movie.title} />
          )}
        </div>
        <div className="detail-hero__overlay" />

        <div className="detail-hero__content">
          {/* Poster */}
          <div className="detail-poster">
            <img
              src={posterUrl(movie.poster_path) || FB_POSTER}
              alt={movie.title}
              onError={e => { e.target.src = FB_POSTER; }}
            />
          </div>

          {/* Info */}
          <div className="detail-info">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            <div className="detail-info__eyebrow">
              {movie.release_date?.slice(0, 4)}
            </div>
            <h1 className="detail-info__title">{movie.title}</h1>
            {movie.tagline && <p className="detail-info__tagline">"{movie.tagline}"</p>}

            <div className="detail-info__meta">
              <span className="detail-info__meta-item gold">⭐ {movie.vote_average?.toFixed(1)} / 10</span>
              {runtime && <span className="detail-info__meta-item">⏱ {runtime}</span>}
              {movie.vote_count && <span className="detail-info__meta-item">👥 {movie.vote_count.toLocaleString()}</span>}
              {movie.status   && <span className="detail-info__meta-item">● {movie.status}</span>}
            </div>

            <div className="detail-info__genres">
              {movie.genres?.map(g => (
                <span key={g.id} className="detail-genre-tag">{g.name}</span>
              ))}
            </div>

            <div className="detail-info__actions">
              <button
                className={`btn ${inList ? 'btn-danger' : 'btn-primary'}`}
                onClick={handleToggleWatchlist}
              >
                {inList ? '✕ Remove from Watchlist' : '+ Add to Watchlist'}
              </button>
              {userRating && (
                <span className="btn btn-success" style={{ cursor: 'default' }}>
                  ⭐ Your Rating: {userRating}/10
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container">
        <div className="detail-body">

          {/* Two-column layout for overview + rating */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'start', marginBottom: '44px' }}>
            {/* Overview */}
            <div>
              <h2 className="detail-section-title">Overview</h2>
              <p className="detail-overview">{movie.overview || 'No overview available.'}</p>
            </div>

            {/* Rating box */}
            <div style={{ minWidth: '220px' }}>
              <div className="rating-box">
                <h3>Rate this film</h3>
                <RatingStars rating={userRating || 0} onRate={handleRate} />
                {userRating && (
                  <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--ink-muted)' }}>
                    Your score: <strong style={{ color: 'var(--gold)' }}>{userRating}/10</strong>
                    <button
                      onClick={() => { addRating(movie, 0); setUserRating(null); }}
                      style={{ marginLeft: '10px', fontSize: '12px', color: 'var(--accent)', cursor: 'pointer', background: 'none', border: 'none' }}
                    >Clear</button>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── NOTES SECTION ── */}
          <div className="detail-section">
            <h2 className="detail-section-title">📝 My Notes</h2>
            <div className="notes-box">
              <h3>Personal Notes</h3>

              {/* Show saved note */}
              {note && !editNote && (
                <div className="notes-box__saved">{note}</div>
              )}

              {/* Edit mode */}
              {editNote ? (
                <>
                  <textarea
                    className="form-textarea"
                    placeholder="Write your thoughts, review, or anything about this movie…"
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    rows={5}
                    autoFocus
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button className="btn btn-primary btn-sm" onClick={handleSaveNote}>Save Note</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditNote(false); setNoteInput(note); }}>Cancel</button>
                  </div>
                </>
              ) : (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setEditNote(true)}
                >
                  {note ? '✏️ Edit Note' : '+ Add a Note'}
                </button>
              )}
            </div>
          </div>

          {/* ── TRAILER ── */}
          <div className="detail-section">
            <h2 className="detail-section-title">🎬 Trailer</h2>
            {trailerKey ? (
              <div className="trailer-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title={`${movie.title} Trailer`}
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="no-trailer">No trailer available</div>
            )}
          </div>

          {/* ── CAST ── */}
          {cast.length > 0 && (
            <div className="detail-section">
              <h2 className="detail-section-title">Cast</h2>
              <div className="cast-scroll">
                {cast.map(p => (
                  <div key={p.id} className="cast-card">
                    <div className="cast-card__img">
                      <img
                        src={profileUrl(p.profile_path) || FB_PROFILE}
                        alt={p.name}
                        onError={e => { e.target.src = FB_PROFILE; }}
                      />
                    </div>
                    <div className="cast-card__body">
                      <div className="cast-card__name">{p.name}</div>
                      <div className="cast-card__char">{p.character}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DETAILS TABLE ── */}
          <div className="detail-section">
            <h2 className="detail-section-title">Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Status',    value: movie.status },
                { label: 'Language',  value: movie.original_language?.toUpperCase() },
                { label: 'Budget',    value: movie.budget  ? `$${(movie.budget  / 1e6).toFixed(1)}M` : null },
                { label: 'Revenue',   value: movie.revenue ? `$${(movie.revenue / 1e6).toFixed(1)}M` : null },
                { label: 'Popularity', value: movie.popularity?.toFixed(1) },
              ].filter(i => i.value).map(item => (
                <div key={item.label} style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '14px 16px',
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '5px' }}>{item.label}</div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--ink)' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SIMILAR MOVIES ROW ── */}
          {similar.length > 0 && (
            <div className="detail-section">
              <h2 className="detail-section-title">You Might Also Like</h2>
              <div className="flick-row">
                {similar.map(m => (
                  <MovieCard key={m.id} movie={m} onAdd={handleAddFromSimilar} variant="row" />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default MovieDetails;
