# 🎬 CineScope

A modern, fully frontend movie discovery platform powered by the free **TMDB API**. No backend required — all user data is stored in the browser's `localStorage`.

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [📄 Pages](#-pages)
- [🗄️ LocalStorage Schema](#️-localstorage-schema)
- [🔌 API Endpoints Used](#-api-endpoints-used)
- [📅 Development Timeline](#-development-timeline)
- [🚢 Deployment](#-deployment)
- [⚠️ Common Pitfalls](#️-common-pitfalls)
- [📜 Attribution](#-attribution)

---

## ✨ Features

- **Movie Browsing** — Popular, top-rated, now playing, and upcoming sections with genre chip filters, search with autocomplete, and a full filter sidebar (genre, year range, rating, language, sort order)
- **User Data (localStorage)** — Add/remove watchlist movies, rate with 1–10 stars, write personal reviews, add notes, and create custom lists (e.g. "Movies to Watch This Weekend")
- **Data Export** — Export all personal data as JSON
- **Admin Dashboard (demo)** — Charts for genre breakdowns, rating distribution, and activity; manage interacted movies. Access by navigating to `/admin` or clicking the logo 5 times · Password: `admin123`
- **Dark / Light Mode** — Theme toggling via context

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | Framework & build tool |
| React Router v6 | Navigation |
| Axios / Fetch | API calls |
| Recharts | Statistics charts |
| Tailwind CSS / CSS Modules | Styling |
| localStorage | User data persistence |

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
# Clone the repo
git clone https://github.com/your-org/cinescope.git
cd cinescope

# Install dependencies
npm install

# Add your TMDB API key
cp .env.example .env
# Edit .env → VITE_TMDB_API_KEY=your_key_here

# Start dev server
npm run dev
```

> Get your free API key at: https://www.themoviedb.org/settings/api

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
src/
├── api/
│   └── tmdb.js              # All TMDB API calls
├── components/
│   ├── layout/              # Header, Footer
│   ├── movies/              # MovieCard, MovieGrid, MovieCarousel, MovieFilters
│   ├── ui/                  # Button, RatingStars, Loader, ErrorMessage
│   └── dashboard/           # MetricCard, Chart, DataTable
├── context/
│   ├── ThemeContext.jsx
│   └── UserDataContext.jsx
├── hooks/
│   ├── useMovies.js
│   ├── useLocalStorage.js
│   └── useFilters.js
├── pages/                   # One file per route
├── utils/
│   ├── storage.js           # localStorage helpers
│   ├── helpers.js
│   └── constants.js
└── App.jsx
```

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, carousels, genre chips |
| Movies | `/movies` | All movies with filters & sorting |
| Movie Details | `/movie/:id` | Full info, cast, trailers |
| Search | `/search?q=` | Search results |
| Watchlist | `/watchlist` | Saved movies (localStorage) |
| My Ratings | `/ratings` | Movies you've rated |
| Custom Lists | `/lists` | User-created lists |
| Stats | `/stats` | Personal movie statistics |
| Admin Dashboard | `/admin` | Charts & management (demo) |

---

## 🗄️ LocalStorage Schema

```json
{
  "watchlist":   [{ "id", "title", "poster", "addedAt", "watched" }],
  "ratings":     [{ "movieId", "rating", "review", "ratedAt" }],
  "customLists": [{ "id", "name", "description", "movies" }],
  "notes":       [{ "movieId", "note" }],
  "preferences": { "theme", "defaultFilter", "itemsPerPage" }
}
```

> ⚠️ localStorage limit is ~5–10MB. Avoid storing large blobs.

---

## 🔌 API Endpoints Used

```js
GET /movie/popular
GET /movie/top_rated
GET /movie/now_playing
GET /movie/upcoming
GET /movie/{id}
GET /movie/{id}/credits
GET /movie/{id}/videos
GET /movie/{id}/similar
GET /search/movie
GET /genre/movie/list
GET /discover/movie
```

**Image base URL:** `https://image.tmdb.org/t/p/`

| Type | Sizes |
|---|---|
| Poster | `w185`, `w342`, `w500` |
| Backdrop | `w780`, `w1280` |

---

## 📅 Development Timeline

| Week | Focus |
|---|---|
| 1 | Setup, API service, homepage carousels, movie details |
| 2 | Search, filters, cast/trailers, watchlist & ratings |
| 3 | Admin dashboard, charts, custom lists, dark/light mode |
| 4 | Polish, error boundaries, responsive fixes, deploy |

---

## 🚢 Deployment

Recommended: **Vercel** or **Netlify**

```bash
npm run build
# Upload /dist folder or connect repo to Vercel/Netlify
```

---

## ⚠️ Common Pitfalls

- **Never commit `.env`** — always use environment variables for the API key
- Always provide a **fallback image** for missing posters
- Show **loading skeletons** while fetching data
- Test on **real mobile devices**, not just browser devtools

---

## 📜 Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

[TMDB Terms of Use](https://www.themoviedb.org/documentation/api/terms-of-use)
