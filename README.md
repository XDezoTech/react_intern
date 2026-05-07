# 🌍 TravelCo

A high-performance, visually immersive travel website built with **React + Vite** to showcase tour packages and drive direct bookings.

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [📄 Pages](#-pages)
- [🎨 Design System](#-design-system)
- [♿ Accessibility](#-accessibility)
- [📅 Development Timeline](#-development-timeline)
- [✏️ Content Updates](#️-content-updates-marketing-team)

---

## ✨ Features

- **Tour Filtering** — Filter destinations by continent, price range, duration, and activity type (Hiking, Beach, Safari) via `FilterSidebar.jsx`
- **Booking Widget (MVP)** — Date picker (check-in / check-out) and guest counter (adults & children)
- **Performance** — Lazy-loaded images via `react-lazy-load-image-component` and smooth page transitions with Framer Motion
- **Mobile-First** — Fully responsive from 320px and up

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | Framework & build tool |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Framer Motion | Animations & page transitions |

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
# Clone the repo
git clone https://github.com/your-org/travelco.git
cd travelco

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   └── ui/           # Shared UI components
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Modal.jsx
│       ├── Accordion.jsx
│       ├── Carousel.jsx
│       └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Destinations.jsx
│   ├── TourDetail.jsx
│   ├── About.jsx
│   ├── Blog.jsx
│   └── Contact.jsx
└── App.jsx
```

---

## 📄 Pages

| Page | Route | Key Features |
|---|---|---|
| Homepage | `/` | Hero video, featured destinations, testimonials |
| Destinations | `/destinations` | Tour grid, filter by region/price/activity |
| Tour Detail | `/tours/:id` | Itinerary tabs, photo gallery, booking widget |
| About | `/about` | Story timeline, team cards |
| Blog | `/blog` | Article cards, category filter |
| Contact | `/contact` | Map, contact form, FAQ accordion |

---

## 🎨 Design System

**Colors:** Deep Navy · Terracotta · Soft Sand

**Fonts:**
- Body: Inter / Poppins
- Hero Headings: Cormorant Garamond

---

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML (`<main>`, `<section>`, `<article>`)
- Color contrast ratio > 4.5:1
- Touch targets minimum 44×44px
- Mobile-first, supports screens from 320px

---

## 📅 Development Timeline

| Week | Focus | Deliverable |
|---|---|---|
| 1 | Setup: repo, Tailwind, routing skeleton | Hello World on localhost |
| 2–3 | Component library + static homepage | Pixel-perfect homepage |
| 4 | Destinations page + filter logic | Functional filters |
| 5 | Single tour page + booking widget | Dynamic routes |
| 6 | Animations, polish, mobile fixes | Smooth UX |

---

## ✏️ Content Updates (Marketing Team)

The following can be updated **without code changes**:

- Tour prices and availability
- Hero images and featured destination slots
- Blog posts

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.

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

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.
