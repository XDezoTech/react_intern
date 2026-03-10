import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { tours } from "../data/tours";
import { GalleryCarousel } from "../components/ui/Carousel";
import { TourCard } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

function BookingWidget({ tour }) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dateError, setDateError] = useState("");

  const total = (adults + children * 0.7) * tour.price;

  const formatNPR = (amount) =>
    "रू " + Math.round(amount).toLocaleString("ne-NP");

  function handleReserve() {
    if (!date) {
      setDateError("Please select a departure date before reserving.");
      return;
    }
    setDateError("");
    setShowConfirm(true);
  }

  const Counter = ({ label, value, onChange, min = 0 }) => (
    <div className="flex items-center justify-between py-3 border-b border-sand-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-navy-900">{label}</p>
        {label === "Adults" && <p className="text-xs text-gray-400">Age 18+</p>}
        {label === "Children" && (
          <p className="text-xs text-gray-400">Age 2–17 · 30% discount</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-9 h-9 border border-sand-200 flex items-center justify-center text-navy-900 hover:border-navy-900 transition-colors disabled:opacity-30 min-w-[44px] min-h-[44px]"
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-6 text-center font-medium text-navy-900">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 border border-sand-200 flex items-center justify-center text-navy-900 hover:border-navy-900 transition-colors min-w-[44px] min-h-[44px]"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white shadow-lg p-6 sticky top-24">
        <div className="mb-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            From
          </p>
          <div className="flex items-end gap-1">
            <span className="font-display text-3xl font-light text-navy-900">
              {tour.priceLabel}
            </span>
            <span className="text-gray-400 text-sm mb-1">/ person</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <svg
              className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-medium text-navy-900">
              {tour.rating}
            </span>
            <span className="text-xs text-gray-400">
              ({tour.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-5">
          {/* Date Input with Validation */}
          <div>
            <label
              htmlFor="booking-date"
              className="block text-xs tracking-widest uppercase font-medium text-navy-400 mb-2"
            >
              Departure Date{" "}
              <span aria-hidden="true" className="text-terracotta-500">
                *
              </span>
            </label>
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateError("");
              }}
              min={new Date().toISOString().split("T")[0]}
              aria-required="true"
              aria-invalid={!!dateError}
              aria-describedby={dateError ? "date-error" : "date-hint"}
              className={`w-full border px-3 py-2.5 text-sm text-navy-900 focus:outline-none transition-colors bg-white min-h-[44px] ${
                dateError
                  ? "border-red-400 bg-red-50"
                  : "border-sand-200 focus:border-navy-900"
              }`}
            />
            {dateError ? (
              <p
                id="date-error"
                role="alert"
                aria-live="polite"
                className="text-red-500 text-xs mt-1 flex items-center gap-1"
              >
                <span aria-hidden="true">⚠</span> {dateError}
              </p>
            ) : (
              <p id="date-hint" className="text-xs text-gray-400 mt-1">
                Choose a future departure date
              </p>
            )}
          </div>

          {/* Guests Counter */}
          <div>
            <p
              className="text-xs tracking-widest uppercase font-medium text-navy-400 mb-2"
              aria-label="Number of guests"
            >
              Guests
            </p>
            <div
              className="border border-sand-200 px-3"
              role="group"
              aria-label="Guest count selector"
            >
              <Counter
                label="Adults"
                value={adults}
                onChange={setAdults}
                min={1}
              />
              <Counter
                label="Children"
                value={children}
                onChange={setChildren}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div
          className="bg-sand-50 p-4 mb-5 space-y-2"
          aria-label="Price breakdown"
        >
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {adults} adult{adults !== 1 ? "s" : ""} × {tour.priceLabel}
            </span>
            <span className="font-medium text-navy-900">
              {formatNPR(adults * tour.price)}
            </span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {children} child{children !== 1 ? "ren" : ""} ×{" "}
                {formatNPR(tour.price * 0.7)}
              </span>
              <span className="font-medium text-navy-900">
                {formatNPR(children * tour.price * 0.7)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-medium text-navy-900 pt-2 border-t border-sand-200">
            <span>Total</span>
            <span className="font-display text-lg">{formatNPR(total)}</span>
          </div>
        </div>

        {/* Reserve Button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center"
          onClick={handleReserve}
          aria-label="Reserve your spot on this tour"
          aria-haspopup="dialog"
        >
          Reserve Your Spot
        </Button>
        <p className="text-xs text-gray-400 text-center mt-3">
          No payment until confirmed · Free cancellation 60 days prior
        </p>

        <div className="mt-5 pt-5 border-t border-sand-100 flex items-center justify-center gap-2 text-xs text-gray-400">
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>
            Need help?{" "}
            <a href="/contact" className="text-terracotta-500 hover:underline">
              Talk to an expert
            </a>
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Booking Request Sent!"
        size="sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="text-center py-4" role="status" aria-live="polite">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3
            id="modal-title"
            className="font-display text-2xl font-medium text-navy-900 mb-2"
          >
            Request Received
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            <strong>{tour.title}</strong>
          </p>
          <p className="text-gray-500 text-sm mb-1">
            {adults} adult{adults !== 1 ? "s" : ""}
            {children > 0
              ? `, ${children} child${children !== 1 ? "ren" : ""}`
              : ""}
          </p>
          {date && (
            <p className="text-gray-500 text-sm mb-4">
              Departing{" "}
              {new Date(date).toLocaleDateString("en-GB", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
          <p className="text-gray-500 text-sm mb-1 font-medium">
            Total: {formatNPR(total)}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Our team will contact you within 24 hours to confirm availability
            and next steps.
          </p>
          <Button
            variant="secondary"
            onClick={() => setShowConfirm(false)}
            className="w-full justify-center"
            aria-label="Close booking confirmation"
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
}

function ItineraryTabs({ itinerary }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {itinerary.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`View Day ${item.day} itinerary`}
            className={`flex-shrink-0 px-4 py-2.5 text-xs tracking-widest uppercase font-medium transition-all min-h-[44px] ${
              active === i
                ? "bg-navy-900 text-white"
                : "bg-sand-100 text-navy-500 hover:bg-sand-200"
            }`}
          >
            Day {item.day}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-sand-50 p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-terracotta-500 text-white flex items-center justify-center flex-shrink-0 font-medium text-sm">
            {itinerary[active].day}
          </div>
          <div>
            <h4 className="font-display text-xl font-medium text-navy-900 mb-2">
              {itinerary[active].title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {itinerary[active].description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Tour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
        <p className="font-display text-5xl text-navy-200 mb-4">
          Tour Not Found
        </p>
        <p className="text-gray-500 mb-8">
          The tour you are looking for does not exist or has been removed.
        </p>
        <Button variant="primary" onClick={() => navigate("/destinations")}>
          Browse All Tours
        </Button>
      </div>
    );
  }

  const related = tours
    .filter(
      (t) =>
        t.id !== tour.id &&
        (t.continent === tour.continent || t.activity === tour.activity),
    )
    .slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[500px] overflow-hidden"
        aria-label="Tour hero"
      >
        <img
          src={tour.heroImage}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-terracotta-500 text-white text-xs px-3 py-1 tracking-widest uppercase">
                {tour.activity}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 tracking-widest uppercase">
                {tour.continent}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 tracking-widest uppercase">
                {tour.difficulty}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-light text-white mb-2">
              {tour.title}
            </h1>
            <p className="text-white/70 text-lg">{tour.subtitle}</p>
            <div className="flex flex-wrap items-center gap-5 mt-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {tour.duration} days
              </span>
              <span className="flex items-center gap-1.5">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Group of {tour.groupSize}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {tour.rating} ({tour.reviewCount} reviews)
              </span>
              <span>{tour.continent}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav
        className="bg-white border-b border-sand-100 px-4 md:px-8 py-3"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-terracotta-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/destinations"
            className="hover:text-terracotta-500 transition-colors"
          >
            Destinations
          </Link>
          <span>/</span>
          <span className="text-navy-900">{tour.title}</span>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section aria-labelledby="overview-heading">
              <h2
                id="overview-heading"
                className="font-display text-3xl font-medium text-navy-900 mb-4"
              >
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {tour.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-sand-50 p-4">
                  <p className="label-tag text-navy-400 mb-2">
                    What's Included
                  </p>
                  <ul className="space-y-1.5">
                    {tour.includes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-green-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-sand-50 p-4">
                  <p className="label-tag text-navy-400 mb-2">Highlights</p>
                  <ul className="space-y-1.5">
                    {tour.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 bg-terracotta-400 rounded-full flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="gallery-heading">
              <h2
                id="gallery-heading"
                className="font-display text-3xl font-medium text-navy-900 mb-4"
              >
                Photo Gallery
              </h2>
              <GalleryCarousel images={tour.gallery} title={tour.title} />
            </section>

            <section aria-labelledby="itinerary-heading">
              <h2
                id="itinerary-heading"
                className="font-display text-3xl font-medium text-navy-900 mb-4"
              >
                Day-by-Day Itinerary
              </h2>
              <ItineraryTabs itinerary={tour.itinerary} />
            </section>

            <div className="flex flex-wrap gap-2">
              {tour.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-sand-100 text-navy-700 text-xs px-3 py-1.5 tracking-wider uppercase font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingWidget tour={tour} />
          </div>
        </div>

        {related.length > 0 && (
          <section
            className="mt-20 pt-12 border-t border-sand-200"
            aria-labelledby="related-heading"
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="label-tag text-terracotta-500 mb-2">
                  You Might Also Like
                </p>
                <h2
                  id="related-heading"
                  className="font-display text-3xl font-medium text-navy-900"
                >
                  Related Tours
                </h2>
              </div>
              <Link
                to="/destinations"
                className="text-xs text-terracotta-500 tracking-widest uppercase hover:text-terracotta-600 transition-colors flex items-center gap-1"
              >
                All tours
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((t, i) => (
                <TourCard key={t.id} tour={t} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
