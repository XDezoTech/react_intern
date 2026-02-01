// =============================================
// utils/storage.js — localStorage Helpers
// Includes: watchlist, ratings, notes
// =============================================

// ===== WATCHLIST =====
export const getWatchlist = () => {
  const data = localStorage.getItem('fv_watchlist');
  return data ? JSON.parse(data) : [];
};
const saveWatchlist = (list) => localStorage.setItem('fv_watchlist', JSON.stringify(list));

export const addToWatchlist = (movie) => {
  const list = getWatchlist();
  if (list.find(m => m.id === movie.id)) return;
  saveWatchlist([...list, {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    watched: false,
    addedAt: Date.now(),
  }]);
};
export const removeFromWatchlist = (id) => saveWatchlist(getWatchlist().filter(m => m.id !== id));
export const toggleWatched = (id) => saveWatchlist(getWatchlist().map(m => m.id === id ? { ...m, watched: !m.watched } : m));
export const isInWatchlist = (id) => getWatchlist().some(m => m.id === id);

// ===== RATINGS =====
export const getRatings = () => {
  const data = localStorage.getItem('fv_ratings');
  return data ? JSON.parse(data) : {};
};
const saveRatings = (r) => localStorage.setItem('fv_ratings', JSON.stringify(r));

export const addRating = (movie, rating) => {
  const r = getRatings();
  r[movie.id] = { rating, id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average, ratedAt: Date.now() };
  saveRatings(r);
};
export const removeRating = (id) => { const r = getRatings(); delete r[id]; saveRatings(r); };
export const getMovieRating = (id) => getRatings()[id]?.rating ?? null;
export const getRatedList = () => Object.values(getRatings()).sort((a, b) => b.ratedAt - a.ratedAt);

// ===== NOTES =====
// Notes stored as { movieId: "note text" }
export const getNotes = () => {
  const data = localStorage.getItem('fv_notes');
  return data ? JSON.parse(data) : {};
};
const saveNotes = (n) => localStorage.setItem('fv_notes', JSON.stringify(n));

export const saveNote = (movieId, text) => {
  const notes = getNotes();
  if (!text.trim()) {
    // If blank, remove the note
    delete notes[movieId];
  } else {
    notes[movieId] = text.trim();
  }
  saveNotes(notes);
};
export const getNote = (movieId) => getNotes()[movieId] ?? '';
export const deleteNote = (movieId) => {
  const notes = getNotes();
  delete notes[movieId];
  saveNotes(notes);
};
