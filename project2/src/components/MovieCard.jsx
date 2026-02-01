// components/MovieCard.jsx
import { useNavigate } from 'react-router-dom';
import { posterUrl } from '../api/tmdb';
import { isInWatchlist } from '../utils/storage';

const FALLBACK = 'https://via.placeholder.com/300x450/eeede8/9a9690?text=No+Poster';

// variant: "row" (default, fixed 148px wide for Netflix rows) | "grid" (fills column)
function MovieCard({ movie, onAdd, variant = 'row', showWatched = false, isWatched = false }) {
  const navigate = useNavigate();
  const year   = movie.release_date?.slice(0, 4) || '—';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—';
  const poster = posterUrl(movie.poster_path) || FALLBACK;
  const inList = isInWatchlist(movie.id);

  return (
    <div
      className={`movie-card ${variant === 'grid' ? 'grid-card' : ''}`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="movie-card__poster">
        <img
          src={poster}
          alt={movie.title}
          onError={e => { e.target.src = FALLBACK; }}
        />

        {/* Rating badge */}
        <div className="movie-card__rating">⭐ {rating}</div>

        {/* Watched pill */}
        {showWatched && isWatched && (
          <div className="movie-card__watched-pill">✓ Watched</div>
        )}

        {/* Hover overlay */}
        <div className="movie-card__overlay" onClick={e => e.stopPropagation()}>
          <button
            className="movie-card__overlay-btn movie-card__overlay-btn--primary"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            View Details
          </button>
          {onAdd && (
            <button
              className="movie-card__overlay-btn movie-card__overlay-btn--secondary"
              onClick={() => onAdd(movie)}
              disabled={inList}
            >
              {inList ? '✓ In List' : '+ Watchlist'}
            </button>
          )}
        </div>
      </div>

      <div className="movie-card__title" title={movie.title}>{movie.title}</div>
      <div className="movie-card__year">{year}</div>
    </div>
  );
}

export default MovieCard;
