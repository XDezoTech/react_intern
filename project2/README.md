# 🎬 FlickVault — Movie Discovery App

A clean, minimal React movie website with a light theme and Netflix-style rows.
Built with React 18, React Router v6, and the free TMDB API.

---

## 🚀 Setup (3 steps)

### 1. Get your free TMDB API key
1. Sign up at **https://www.themoviedb.org/**
2. Go to **Settings → API**
3. Copy your **API Key (v3 auth)**

### 2. Add the key to the project
Open `src/api/tmdb.js` and replace line 7:
```js
const API_KEY = 'YOUR_API_KEY_HERE';
```
with your real key, for example:
```js
const API_KEY = 'a1b2c3d4e5f6a1b2c3d4e5f6';
```

### 3. Install and run
Open **Command Prompt** (not PowerShell) and run:
```cmd
npm install
npm start
```
App opens at **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
src/
├── api/
│   └── tmdb.js              ← All TMDB API functions
├── components/
│   ├── Header.jsx            ← Top navigation
│   ├── Footer.jsx            ← Bottom footer
│   ├── MovieCard.jsx         ← Reusable movie card
│   └── UI.jsx                ← Loader, Toast, RatingStars
├── pages/
│   ├── Home.jsx              ← Netflix-style rows + hero
│   ├── Movies.jsx            ← Browse + filters
│   ├── MovieDetails.jsx      ← Full detail + notes + trailer
│   ├── Search.jsx            ← Search movies
│   ├── Watchlist.jsx         ← Saved movies list
│   ├── Ratings.jsx           ← Your rated movies
│   ├── Admin.jsx             ← Stats dashboard
│   └── NotFound.jsx          ← 404 page
├── utils/
│   └── storage.js            ← localStorage (watchlist, ratings, notes)
├── App.js                    ← Routes
├── index.js                  ← Entry point
└── index.css                 ← All styles (light theme)
```

---

## ✨ Features

| Feature | Notes |
|---|---|
| Home | Hero banner, Netflix-style rows, genre filter pills |
| Browse | Grid view, filter by genre / year / rating / sort |
| Details | Full info, cast, YouTube trailer, similar movies |
| **Notes** | ✏️ Write personal notes on any movie (saved in browser) |
| Watchlist | Save movies, mark as watched, tabs (All / To Watch / Watched) |
| Ratings | Rate 1–10 with stars, sort by score/date/title |
| Dashboard | Stats, progress bar, rating distribution chart, activity feed |

---

## 🎨 Design Decisions

- **Light theme** — clean white/warm gray palette, no dark background
- **Playfair Display** — elegant serif display font for headings
- **Outfit** — modern geometric sans for body text
- **Netflix-style rows** — horizontal scrollable rows on Home page
- **Minimal cards** — simple poster cards with hover overlay
- **No excessive color** — accent red used sparingly for CTAs only

---

## 💡 How Notes Work

1. Go to any **Movie Details** page
2. Scroll to the **📝 My Notes** section
3. Click **"+ Add a Note"**
4. Type anything — review, thoughts, quotes
5. Click **Save Note**

Your note is saved to `localStorage` and also shows as a preview
on the **Watchlist** page next to that movie.

---

## ⚠️ Using Command Prompt (Windows)

If you get a PowerShell error, use **Command Prompt** instead:
- Press `Win + R` → type `cmd` → Enter
- Navigate: `cd C:\path\to\flickvault`
- Run: `npm install` then `npm start`

---

Built for learning React. Data from TMDB.
