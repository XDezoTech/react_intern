TravelCo – React Website
A high-performance, visually immersive travel website built with React + Vite to showcase tour packages and drive direct bookings.

Tech Stack
ToolPurposeReact + ViteFramework & build toolReact RouterClient-side routingTailwind CSSStylingFramer MotionAnimations & page transitions

Getting Started
bash# Clone the repo
git clone https://github.com/your-org/travelco.git
cd travelco

# Install dependencies
npm install

# Start dev server
npm run dev
Open http://localhost:5173 in your browser.

Project Structure
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

Pages
PageRouteKey FeaturesHomepage/Hero video, featured destinations, testimonialsDestinations/destinationsTour grid, filter by region/price/activityTour Detail/tours/:idItinerary tabs, photo gallery, booking widgetAbout/aboutStory timeline, team cardsBlog/blogArticle cards, category filterContact/contactMap, contact form, FAQ accordion

Features
Tour Filtering
Filter destinations by continent, price range, duration, and activity type (Hiking, Beach, Safari) via FilterSidebar.jsx.
Booking Widget (MVP)

Date picker (check-in / check-out)
Guest counter (adults & children)

Performance

Lazy-loaded images via react-lazy-load-image-component
Smooth page transitions with Framer Motion


Design System
Colors: Deep navy · Terracotta · Soft sand
Fonts: Inter/Poppins (body) · Cormorant Garamond (hero headings)

Accessibility

WCAG 2.1 AA compliant
Semantic HTML (<main>, <section>, <article>)
Color contrast ratio > 4.5:1
Touch targets minimum 44×44px
Mobile-first, supports screens from 320px


Development Timeline
WeekFocusDeliverable1Setup: repo, Tailwind, routing skeletonHello World on localhost2–3Component library + static homepagePixel-perfect homepage4Destinations page + filter logicFunctional filters5Single tour page + booking widgetDynamic routes6Animations, polish, mobile fixesSmooth UX

Content Updates (Marketing Team)
The following can be updated without code changes:

Tour prices and availability
Hero images and featured destination slots
Blog posts

CineScope – Movie Discovery Platform
A modern, fully frontend movie discovery website powered by the free TMDB API. No backend required — all user data is stored in the browser's localStorage.

Tech Stack
ToolPurposeReact + ViteFramework & build toolReact Router v6NavigationAxios / FetchAPI callsRechartsStatistics chartsTailwind CSS / CSS ModulesStylingLocalStorageUser data persistence

Getting Started
bash# Clone the repo
git clone https://github.com/your-org/cinescope.git
cd cinescope

# Install dependencies
npm install

# Add your TMDB API key
cp .env.example .env
# Edit .env → VITE_TMDB_API_KEY=your_key_here

# Start dev server
npm run dev
Get your free API key at: https://www.themoviedb.org/settings/api

Project Structure
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

Pages
PageRouteDescriptionHome/Hero, carousels, genre chipsMovies/moviesAll movies with filters & sortingMovie Details/movie/:idFull info, cast, trailersSearch/search?q=Search resultsWatchlist/watchlistSaved movies (localStorage)My Ratings/ratingsMovies you've ratedCustom Lists/listsUser-created listsStats/statsPersonal movie statisticsAdmin Dashboard/adminCharts & management (demo)

Key Features
Movie Browsing

Popular, top-rated, now playing, and upcoming sections
Genre chip filters, search with autocomplete
Filter sidebar: genre, year range, rating, language, sort order

User Data (localStorage)

Add/remove movies from watchlist
Rate movies (1–10 stars) with personal reviews
Add notes to any movie
Create custom lists (e.g. "Movies to Watch This Weekend")
Export all data as JSON

Admin Dashboard (demo, no auth)

Access: navigate to /admin or click the logo 5 times · Password: admin123


Metrics: total genres, average rating, watchlist count
Charts: movies by genre, rating distribution, your activity
Manage interacted movies (edit notes, remove ratings)


API Endpoints Used
jsGET /movie/popular
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
Image base URL: https://image.tmdb.org/t/p/
Poster sizes: w185, w342, w500 · Backdrop sizes: w780, w1280

LocalStorage Schema
json{
  "watchlist":   [{ "id", "title", "poster", "addedAt", "watched" }],
  "ratings":     [{ "movieId", "rating", "review", "ratedAt" }],
  "customLists": [{ "id", "name", "description", "movies" }],
  "notes":       [{ "movieId", "note" }],
  "preferences": { "theme", "defaultFilter", "itemsPerPage" }
}

localStorage limit is ~5–10MB. Avoid storing large blobs.


Development Timeline
WeekFocus1Setup, API service, homepage carousels, movie details2Search, filters, cast/trailers, watchlist & ratings3Admin dashboard, charts, custom lists, dark/light mode4Polish, error boundaries, responsive fixes, deploy

Deployment
Recommended: Vercel or Netlify
bashnpm run build
# Upload /dist folder or connect repo to Vercel/Netlify

Common Pitfalls

Never commit .env — always use environment variables for the API key
Always provide a fallback image for missing posters
Show loading skeletons while fetching data
Test on real mobile devices, not just browser devtools


Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB.
TMDB Terms of Use
