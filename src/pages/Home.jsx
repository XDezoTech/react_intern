import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TourCard } from "../components/ui/Card";
import { TestimonialCarousel } from "../components/ui/Carousel";
import Button from "../components/ui/Button";
import { tours, testimonials } from "../data/tours";

const featuredTours = tours.filter((t) => t.featured).slice(0, 3);

const destinations = [
  {
    name: "Annapurna Circuit",
    region: "Gandaki Province",
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80",
    count: 6,
  },
  {
    name: "Everest Base Camp",
    region: "Koshi Province",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    count: 5,
  },
  {
    name: "Chitwan Jungle",
    region: "Bagmati Province",
    image:
      "https://www.chitwanjungleguides.com/wp-content/uploads/2019/01/jeep-safari-in-chitwan-national-park.jpg",
    count: 4,
  },
  {
    name: "Pokhara Lakeside",
    region: "Gandaki Province",
    image:
      "https://tourguideinnepal.com/wp-content/uploads/2024/01/Phewa-Lake-Pokhara-Nepal-1.jpg",
    count: 7,
  },
  {
    name: "Lumbini",
    region: "Lumbini Province",
    image:
      "https://lumbinidevtrust.gov.np/upload_file/images/slider/1721894939_276597348_lumbini.jpg",
    count: 3,
  },
  {
    name: "Upper Mustang",
    region: "Gandaki Province",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    count: 2,
  },
];

const stats = [
  { value: "7", label: "Provinces Covered" },
  { value: "3K+", label: "Happy Travellers" },
  { value: "10", label: "Years of Expertise" },
  { value: "4.9", label: "Average Rating" },
];

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <div className="absolute inset-0 bg-navy-950/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&q=80"
          alt="Annapurna range at dawn"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-terracotta-300 text-xs tracking-[0.4em] uppercase font-medium mb-6"
        >
          Discover Nepal's Beauty
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] mb-8"
          style={{ letterSpacing: "-0.02em" }}
        >
          Nepal Is
          <br />
          <em className="font-light italic">Calling</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/70 text-base md:text-lg max-w-md mb-10 font-light"
        >
          Carefully curated treks, safaris, and cultural tours across Nepal—for
          Nepalis who love their country.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="primary" size="lg" href="/destinations">
            Explore Destinations
          </Button>
          <Button variant="outline-white" size="lg" href="/about">
            Our Story
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-navy-950 py-12" aria-label="Company statistics">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-light text-white mb-1">
                {stat.value}
              </p>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section
      className="section-padding bg-sand-50"
      aria-labelledby="destinations-heading"
    >
      <div className="container-max">
        <div className="text-center mb-12">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="destinations-heading"
            className="font-display text-4xl md:text-5xl font-light text-navy-900"
          >
            Nepal's Finest Destinations
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group relative overflow-hidden cursor-pointer ${
                i === 0 ? "md:row-span-2" : ""
              }`}
            >
              <Link
                to={`/destinations?region=${dest.region}`}
                className="block"
              >
                <div
                  className={`relative overflow-hidden ${i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                >
                  <LazyLoadImage
                    src={dest.image}
                    alt={dest.name}
                    effect="blur"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 md:p-5">
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-0.5">
                      {dest.region}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-white">
                      {dest.name}
                    </h3>
                    <p className="text-white/50 text-xs mt-1">
                      {dest.count} tours
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="secondary" size="lg" href="/destinations">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedToursSection() {
  return (
    <section className="section-padding" aria-labelledby="featured-heading">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="label-tag text-terracotta-500 mb-3"
            >
              Handpicked
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              id="featured-heading"
              className="font-display text-4xl md:text-5xl font-light text-navy-900"
            >
              Featured Tours
            </motion.h2>
          </div>
          <Link
            to="/destinations"
            className="text-sm text-terracotta-500 hover:text-terracotta-600 transition-colors flex items-center gap-1 font-medium tracking-wider uppercase text-xs self-start md:self-auto"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const reasons = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Nepali-Led Expertise",
      description:
        "Every itinerary is designed by locals who know Nepal's trails, seasons, and hidden gems intimately.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      title: "Small Group Sizes",
      description:
        "Never more than 14 people. The intimacy of travel with a trusted group, the freedom of genuine exploration.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
          />
        </svg>
      ),
      title: "Responsible Travel",
      description:
        "We support local communities, porters, and conservation projects across all our tour routes.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "२४/७ Support",
      description:
        "A real Nepali-speaking person, reachable by phone, from your first inquiry until you return home safely.",
    },
  ];

  return (
    <section
      className="section-padding bg-navy-950 text-white"
      aria-labelledby="why-heading"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label-tag text-terracotta-400 mb-3"
          >
            The TravelCo Difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="why-heading"
            className="font-display text-4xl md:text-5xl font-light text-white"
          >
            Why Nepalis Choose Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-14 h-14 border border-terracotta-500/40 flex items-center justify-center mx-auto mb-5 text-terracotta-400">
                {reason.icon}
              </div>
              <h3 className="font-display text-xl font-medium text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      className="section-padding bg-sand-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label-tag text-terracotta-500 mb-3"
          >
            True Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="testimonials-heading"
            className="font-display text-4xl md:text-5xl font-light text-navy-900"
          >
            What Our Travellers Say
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <TestimonialCarousel testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      aria-label="Call to action"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1920&q=80"
          alt="Pokhara lakeside at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/70" />
      </div>
      <div className="relative z-10 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-light text-white mb-6"
        >
          Your Next Adventure
          <br />
          <em className="italic">Starts in Nepal</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-base md:text-lg max-w-md mx-auto mb-10"
        >
          Browse our full collection of curated tours across all 7 provinces of
          Nepal.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="lg" href="/destinations">
            Browse All Tours
          </Button>
          <Button variant="outline-white" size="lg" href="/contact">
            Talk to an Expert
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DestinationsSection />
      <FeaturedToursSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
