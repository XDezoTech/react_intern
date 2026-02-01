// components/Loader.jsx
import { useEffect } from 'react';

export function Loader({ text = 'Loading…' }) {
  return (
    <div className="loader-wrapper">
      <div className="loader" />
      <p className="loader-text">{text}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// components/Toast.jsx
export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`toast ${type}`} onClick={onClose}>
      <span className="toast-dot" />
      {message}
    </div>
  );
}

// ─────────────────────────────────────────
// components/RatingStars.jsx
export function RatingStars({ rating = 0, onRate = null, readonly = false }) {
  const stars = Math.round(rating / 2);
  return (
    <div className={`rating-stars ${readonly ? 'readonly' : ''}`}>
      {[1, 2, 3, 4, 5].map(s => (
        <span
          key={s}
          className={`rating-stars__star ${s <= stars ? 'filled' : ''}`}
          onClick={() => !readonly && onRate && onRate(s * 2)}
          title={readonly ? `${rating}/10` : `Rate ${s * 2}/10`}
        >★</span>
      ))}
      {rating > 0 && (
        <span className="rating-stars__label">{Number(rating).toFixed(1)}/10</span>
      )}
    </div>
  );
}
