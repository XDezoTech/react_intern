// App.js — Main app with routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home         from './pages/Home';
import Movies       from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Search       from './pages/Search';
import Watchlist    from './pages/Watchlist';
import Ratings      from './pages/Ratings';
import Admin        from './pages/Admin';
import NotFound     from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/movies"    element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search"    element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/ratings"   element={<Ratings />} />
        <Route path="/admin"     element={<Admin />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
