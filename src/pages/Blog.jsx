import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BlogCard } from '../components/ui/Card';
import { blogPosts } from '../data/blogPosts';

const categories = ['All', ...new Set(blogPosts.map(p => p.category))];

// ─── Blog Index ──────────────────────────────────────────────────────────────
export function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const featured = blogPosts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeCategory !== 'All');
  const listPosts = activeCategory === 'All' ? filtered.filter(p => !p.featured) : filtered;

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <section className="relative pt-32 pb-16 bg-navy-950 overflow-hidden" aria-label="Blog header">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="label-tag text-terracotta-400 mb-3">Stories & Guides</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-6xl font-light text-white">The Travel Journal</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/50 mt-3 text-sm">Expertise, honesty, and hard-won knowledge from the field.</motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-10" role="tablist" aria-label="Blog categories">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-medium transition-all min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-navy-900 text-white'
                  : 'bg-white text-navy-500 hover:bg-sand-100 border border-sand-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {activeCategory === 'All' && featured && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group mb-12"
          >
            <Link to={`/blog/${featured.id}`} className="grid md:grid-cols-2 gap-0 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                <LazyLoadImage
                  src={featured.coverImage}
                  alt={featured.title}
                  effect="blur"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  wrapperClassName="w-full h-full"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-terracotta-500 text-white text-xs px-3 py-1 tracking-widest uppercase">Featured</span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="label-tag text-terracotta-500 mb-3">{featured.category}</p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-navy-900 mb-3 group-hover:text-terracotta-500 transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  <img src={featured.authorAvatar} alt={featured.author} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-medium text-navy-900">{featured.author}</p>
                    <p className="text-xs text-gray-400">{featured.date} · {featured.readTime}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* Post grid */}
        {listPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-navy-200 mb-3">No posts yet</p>
            <button onClick={() => setActiveCategory('All')} className="text-sm text-terracotta-500 underline underline-offset-2">View all posts</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Single Blog Post ─────────────────────────────────────────────────────────
export function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-4">
        <p className="font-display text-5xl text-navy-200 mb-4">Post Not Found</p>
        <Link to="/blog" className="text-terracotta-500 hover:underline text-sm">Back to Journal</Link>
      </div>
    );
  }

  const related = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.author === post.author))
    .slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden" aria-label="Article hero">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 md:px-8 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="bg-terracotta-500 text-white text-xs px-3 py-1 tracking-widest uppercase mb-4 inline-block">{post.category}</span>
            <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-3 leading-tight">{post.title}</h1>
            <p className="text-white/60 text-base">{post.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-sand-100 px-4 md:px-8 py-3" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-terracotta-500">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-terracotta-500">Journal</Link>
          <span>/</span>
          <span className="text-navy-900 truncate">{post.title}</span>
        </div>
      </nav>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Author bar */}
            <div className="flex items-center gap-4 pb-8 mb-8 border-b border-sand-200">
              <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-medium text-navy-900 text-sm">{post.author}</p>
                <p className="text-xs text-gray-400">{post.authorRole}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{post.date}</p>
                <p className="text-xs text-terracotta-500">{post.readTime}</p>
              </div>
            </div>

            {/* Rendered markdown */}
            <div className="prose-travel">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="font-display text-2xl md:text-3xl font-medium text-navy-900 mt-10 mb-4">{children}</h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-600 leading-[1.85] mb-5 text-base">{children}</p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-terracotta-400 pl-5 my-8 font-display text-xl md:text-2xl font-light text-navy-900 italic leading-relaxed">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-navy-900">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 mb-5 ml-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 text-gray-600 text-base leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 bg-terracotta-400 rounded-full flex-shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-sand-200">
              {post.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {}}
                  className="bg-sand-100 text-navy-700 text-xs px-3 py-1.5 tracking-wider uppercase font-medium hover:bg-sand-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1" aria-label="Related posts">
            <div className="sticky top-24 space-y-8">
              {/* Author card */}
              <div className="bg-sand-50 p-5">
                <p className="label-tag text-navy-400 mb-4">About the Author</p>
                <div className="flex items-start gap-3">
                  <img src={post.authorAvatar} alt={post.author} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="font-medium text-navy-900 text-sm">{post.author}</p>
                    <p className="text-xs text-terracotta-500 mb-2">{post.authorRole}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">One of TravelCo's founding team members and an expert in their region.</p>
                  </div>
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div>
                  <p className="label-tag text-navy-400 mb-4">Related Stories</p>
                  <div className="space-y-5">
                    {related.map((p, i) => (
                      <BlogCard key={p.id} post={p} index={i} horizontal />
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-navy-950 p-5">
                <p className="label-tag text-terracotta-400 mb-2">Newsletter</p>
                <p className="text-white text-sm font-display text-xl font-light mb-3">Don't miss the next story</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 text-white text-xs px-3 py-2.5 placeholder-white/30 focus:outline-none focus:border-terracotta-400 mb-2 min-h-[44px]"
                />
                <button className="w-full bg-terracotta-500 text-white text-xs tracking-widest uppercase py-2.5 hover:bg-terracotta-600 transition-colors min-h-[44px]">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* More posts */}
      {related.length > 0 && (
        <section className="border-t border-sand-200 bg-sand-50 section-padding" aria-labelledby="more-posts-heading">
          <div className="container-max">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="label-tag text-terracotta-500 mb-2">Keep Reading</p>
                <h2 id="more-posts-heading" className="font-display text-3xl font-medium text-navy-900">More from the Journal</h2>
              </div>
              <Link to="/blog" className="text-xs text-terracotta-500 tracking-widest uppercase hover:text-terracotta-600 transition-colors flex items-center gap-1">
                All posts <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, i) => <BlogCard key={p.id} post={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

// Default export is the index page
export default BlogIndex;
