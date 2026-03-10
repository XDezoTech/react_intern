import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TourCard } from "../components/ui/Card";
import { useTours } from "../hooks/useTours";

const continents = [
  "Koshi Province",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

const activities = [
  "Trekking",
  "Jungle Safari",
  "Paragliding",
  "Culture & Heritage",
  "Pilgrimage",
  "Rafting",
  "Mountain Biking",
];

const durations = [
  { value: "1-3", label: "1–3 days" },
  { value: "4-7", label: "4–7 days" },
  { value: "8-14", label: "8–14 days" },
  { value: "15+", label: "15+ days" },
];

// Price range in NPR (Nepali Rupees)
const priceRanges = [5000, 15000, 30000, 60000, 100000];

function FilterSidebar({
  filters,
  toggleFilter,
  setFilters,
  resetFilters,
  activeFilterCount,
  onClose,
}) {
  return (
    <aside aria-label="Tour filters">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-medium text-navy-900">
          Filters
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-terracotta-500 hover:text-terracotta-600 transition-colors tracking-widest uppercase underline underline-offset-2"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Province */}
      <div className="mb-7">
        <h3 className="label-tag text-navy-400 mb-3">Province</h3>
        <div className="space-y-2">
          {continents.map((c) => (
            <label
              key={c}
              className="flex items-center gap-3 cursor-pointer group min-h-[44px]"
            >
              <input
                type="checkbox"
                checked={filters.continents.includes(c)}
                onChange={() => toggleFilter("continents", c)}
                className="w-4 h-4 accent-terracotta-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-navy-900 transition-colors">
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="mb-7 pt-6 border-t border-sand-100">
        <h3 className="label-tag text-navy-400 mb-3">Activity Type</h3>
        <div className="space-y-2">
          {activities.map((a) => (
            <label
              key={a}
              className="flex items-center gap-3 cursor-pointer group min-h-[44px]"
            >
              <input
                type="checkbox"
                checked={filters.activities.includes(a)}
                onChange={() => toggleFilter("activities", a)}
                className="w-4 h-4 accent-terracotta-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-navy-900 transition-colors">
                {a}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-7 pt-6 border-t border-sand-100">
        <h3 className="label-tag text-navy-400 mb-3">Duration</h3>
        <div className="space-y-2">
          {durations.map((d) => (
            <label
              key={d.value}
              className="flex items-center gap-3 cursor-pointer group min-h-[44px]"
            >
              <input
                type="checkbox"
                checked={filters.durations.includes(d.value)}
                onChange={() => toggleFilter("durations", d.value)}
                className="w-4 h-4 accent-terracotta-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-navy-900 transition-colors">
                {d.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price in NPR */}
      <div className="pt-6 border-t border-sand-100">
        <h3 className="label-tag text-navy-400 mb-3">Max Price (per person)</h3>
        <input
          type="range"
          min={5000}
          max={200000}
          step={5000}
          value={filters.priceMax}
          onChange={(e) =>
            setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))
          }
          className="w-full accent-terracotta-500"
          aria-label="Maximum price in NPR"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>रू ५,०००</span>
          <span className="font-medium text-navy-900">
            {filters.priceMax >= 200000
              ? "Any"
              : `रू ${filters.priceMax.toLocaleString("ne-NP")}`}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default function Destinations() {
  const {
    tours,
    filters,
    sortBy,
    setSortBy,
    toggleFilter,
    setFilters,
    resetFilters,
    activeFilterCount,
  } = useTours();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Page header */}
      <section
        className="relative pt-32 pb-16 bg-navy-950 overflow-hidden"
        aria-label="Page header"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="label-tag text-terracotta-400 mb-3"
          >
            नेपाल अन्वेषण गर्नुहोस्
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-white"
          >
            All Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 mt-4 max-w-lg mx-auto"
          >
            {tours.length} curated tours across{" "}
            {new Set(tours.map((t) => t.continent)).size} provinces of Nepal
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar – Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 shadow-sm">
              <FilterSidebar
                filters={filters}
                toggleFilter={toggleFilter}
                setFilters={setFilters}
                resetFilters={resetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>

  
          <div className="lg:hidden">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-navy-900 border border-navy-200 px-4 py-2.5 hover:border-navy-900 transition-colors min-h-[44px]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-terracotta-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setMobileFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed left-0 top-0 h-full w-80 bg-white z-50 p-6 overflow-y-auto lg:hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-2xl font-medium text-navy-900">
                      Filters
                    </h2>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Close filters"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    toggleFilter={toggleFilter}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                    activeFilterCount={activeFilterCount}
                    onClose={() => setMobileFilterOpen(false)}
                  />
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full mt-6 bg-navy-900 text-white py-3 text-xs tracking-widest uppercase font-medium hover:bg-navy-800 transition-colors min-h-[44px]"
                  >
                    Show {tours.length} Results
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Tour grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand-200">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-navy-900">
                  {tours.length}
                </span>{" "}
                tours found
              </p>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="text-xs text-gray-500 hidden sm:block"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-gray-200 px-3 py-2 bg-white focus:outline-none focus:border-navy-500 min-h-[44px]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            {tours.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-3xl text-navy-300 mb-4">
                  No tours found
                </p>
                <p className="text-gray-500 mb-6">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="text-sm text-terracotta-500 underline underline-offset-2"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {tours.map((tour, i) => (
                  <TourCard key={tour.id} tour={tour} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
