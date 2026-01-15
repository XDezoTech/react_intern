import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export function TourCard({ tour, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      <Link to={`/tour/${tour.id}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3]">
         
          <LazyLoadImage
            src={tour.heroImage}
            alt={tour.title}
            effect="blur"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-terracotta-500 text-white text-xs px-3 py-1 tracking-widest uppercase font-medium">
              {tour.activity}
            </span>
            {tour.featured && (
              <span className="bg-sand-300 text-navy-900 text-xs px-3 py-1 tracking-widest uppercase font-medium">
                Featured
              </span>
            )}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs tracking-[0.2em] uppercase opacity-80">
              {tour.country}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-xl font-medium text-navy-900 leading-tight group-hover:text-terracotta-500 transition-colors">
              {tour.title}
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">{tour.subtitle}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {tour.duration} days
            </span>
            <span className="flex items-center gap-1">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {tour.groupSize}
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {tour.rating} ({tour.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-sand-100">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                From
              </p>
              <p className="text-xl font-display font-medium text-navy-900">
                {tour.priceLabel}
              </p>
              <p className="text-xs text-gray-400">per person</p>
            </div>
            <span className="text-terracotta-500 text-xs tracking-widest uppercase font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              View Tour
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
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogCard({ post, index = 0, horizontal = false }) {
  if (horizontal) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group flex gap-4 items-start"
      >
        <Link to={`/blog/${post.id}`} className="flex gap-4 items-start w-full">
          <div className="w-24 h-20 overflow-hidden flex-shrink-0">
            <LazyLoadImage
              src={post.coverImage}
              alt={post.title}
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              wrapperClassName="w-full h-full"
            />
          </div>
          <div>
            <p className="text-xs text-terracotta-500 tracking-widest uppercase font-medium mb-1">{post.category}</p>
            <h4 className="font-display text-base font-medium text-navy-900 group-hover:text-terracotta-500 transition-colors leading-tight">
              {post.title}
            </h4>
            <p className="text-xs text-gray-400 mt-1">{post.readTime}</p>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      <Link to={`/blog/${post.id}`} className="block">
        <div className="relative overflow-hidden aspect-[16/9]">
          <LazyLoadImage
            src={post.coverImage}
            alt={post.title}
            effect="blur"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-terracotta-500 text-white text-xs px-3 py-1 tracking-widest uppercase">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="font-display text-xl font-medium text-navy-900 mb-2 group-hover:text-terracotta-500 transition-colors leading-tight">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-2 pt-4 border-t border-sand-100">
            <LazyLoadImage
              src={post.authorAvatar}
              alt={post.author}
              className="w-7 h-7 rounded-full object-cover"
              wrapperClassName="w-7 h-7"
              effect="blur"
            />
            <div>
              <p className="text-xs font-medium text-navy-900">{post.author}</p>
              <p className="text-xs text-gray-400">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function TeamCard({ member, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group text-center"
    >
      <div className="relative overflow-hidden aspect-square mb-4">
        <LazyLoadImage
          src={member.image}
          alt={member.name}
          effect="blur"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          wrapperClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/20 transition-all duration-300" />
      </div>
      <h3 className="font-display text-xl font-medium text-navy-900">{member.name}</h3>
      <p className="text-terracotta-500 text-xs tracking-widest uppercase font-medium mt-1 mb-3">{member.role}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
      <p className="text-xs text-sand-500 mt-2">{member.instagram}</p>
    </motion.article>
  );
}
