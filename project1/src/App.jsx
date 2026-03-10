import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Tour from './pages/Tour';
import About from './pages/About';
import { BlogIndex, BlogPost } from './pages/Blog';
import Contact from './pages/Contact';

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-navy-900 border-t-terracotta-500 rounded-full animate-spin" />
        <p className="text-xs tracking-widest uppercase text-navy-400">Loading</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-sand-50">
      <p className="font-display text-[8rem] font-light text-sand-200 leading-none select-none">404</p>
      <h1 className="font-display text-3xl md:text-4xl font-medium text-navy-900 mb-4 -mt-4">
        This Path Leads Nowhere
      </h1>
      <p className="text-gray-500 mb-8 max-w-sm text-sm leading-relaxed">
        The page you're looking for doesn't exist. Perhaps it was removed, or you've wandered off the map.
      </p>
      <div className="flex gap-4">
        <a
          href="/"
          className="bg-navy-900 text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-navy-800 transition-colors min-h-[44px] flex items-center"
        >
          Back to Home
        </a>
        <a
          href="/destinations"
          className="bg-terracotta-500 text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-terracotta-600 transition-colors min-h-[44px] flex items-center"
        >
          Browse Tours
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/tour/:id" element={<Tour />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
