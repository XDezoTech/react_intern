import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TeamCard } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { teamMembers } from '../data/tours';

const timeline = [
  {
    year: '2009',
    title: 'A Single Trek',
    description: 'Founder Amara Diallo leads her first commercial Patagonia group—8 strangers who become lifelong friends. The seed is planted.',
  },
  {
    year: '2011',
    title: 'Incorporated',
    description: 'TravelCo Ltd formally registers in London. First website, first brochure, first office: a rented desk in Hackney.',
  },
  {
    year: '2013',
    title: 'Africa Launch',
    description: 'Kofi Mensah joins as Africa director. First Serengeti safari runs—completely sold out. Waiting list begins.',
  },
  {
    year: '2015',
    title: 'Asia Expansion',
    description: 'Yuki Tanaka comes aboard. Japan, Maldives, and Southeast Asia added to the portfolio. Group size capped at 14.',
  },
  {
    year: '2018',
    title: 'Sustainability Pledge',
    description: 'TravelCo commits to 200% carbon offsetting and the 40% local economy rule—before it was fashionable.',
  },
  {
    year: '2021',
    title: 'Through the Storm',
    description: 'COVID-19 closes the world. We refund every booking in full. 100% of our staff are retained. Trust deepens.',
  },
  {
    year: '2024',
    title: 'Today',
    description: '94 countries, 12,000+ travellers, 4.9 stars. The adventure continues—and it\'s just getting started.',
  },
];

const instagramImages = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80',
  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80',
  'https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=400&q=80',
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80',
  'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&q=80',
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
];

const values = [
  {
    icon: '✦',
    title: 'Authenticity',
    description: 'We refuse to sell experiences we haven\'t lived ourselves. Every route is walked before it\'s sold.',
  },
  {
    icon: '◈',
    title: 'Responsibility',
    description: 'The places we visit are borrowed from the future. We operate accordingly.',
  },
  {
    icon: '◎',
    title: 'Intimacy',
    description: 'Small groups, deep connections. Travel should change relationships, not just your passport.',
  },
  {
    icon: '⊹',
    title: 'Excellence',
    description: 'From the first email to the airport farewell, every touchpoint is considered.',
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-navy-950 overflow-hidden" aria-label="About hero">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 to-navy-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="label-tag text-terracotta-400 mb-4"
          >
            Who We Are
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-5xl md:text-7xl font-light text-white mb-6 leading-tight"
          >
            We Believe Travel
            <br />
            <em className="italic">Should Change You</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Founded in 2009 with one Patagonia trek and eight willing strangers, TravelCo has grown into one of the world's most trusted boutique adventure travel companies. We've never forgotten what we're for: getting extraordinary people into extraordinary places.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-sand-50" aria-labelledby="values-heading">
        <div className="container-max">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label-tag text-terracotta-500 mb-3">What Drives Us</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="values-heading" className="font-display text-4xl md:text-5xl font-light text-navy-900">Our Values</motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl text-terracotta-400 mb-4 font-light">{v.icon}</div>
                <h3 className="font-display text-xl font-medium text-navy-900 mb-3">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" aria-labelledby="timeline-heading">
        <div className="container-max">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label-tag text-terracotta-500 mb-3">How We Got Here</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="timeline-heading" className="font-display text-4xl md:text-5xl font-light text-navy-900">Our Story</motion.h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-sand-200 -translate-x-1/2" aria-hidden="true" />

            <div className="space-y-10">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Year dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-terracotta-500 rounded-full top-1.5 flex-shrink-0 z-10" />

                  {/* Content */}
                  <div className={`pl-14 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="label-tag text-terracotta-500 block mb-1">{event.year}</span>
                    <h3 className="font-display text-xl font-medium text-navy-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder quote */}
      <section className="relative py-24 overflow-hidden" aria-label="Founder quote">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-navy-950/75" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-5xl font-display text-terracotta-300 leading-none mb-4">"</p>
            <p className="font-display text-2xl md:text-3xl font-light text-white italic leading-relaxed mb-8">
              I've been to 94 countries. The ones I remember most are not the most beautiful — they're the ones where I was most present.
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80"
                alt="Amara Diallo"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-medium text-white">Amara Diallo</p>
                <p className="text-white/50 text-sm">Founder & Chief Explorer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding bg-sand-50" aria-labelledby="team-heading">
        <div className="container-max">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label-tag text-terracotta-500 mb-3">The People</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="team-heading" className="font-display text-4xl md:text-5xl font-light text-navy-900">Meet the Team</motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Every member of our core team is an active traveller who operates in their region. No armchair experts here.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram feed */}
      <section className="section-padding" aria-labelledby="instagram-heading">
        <div className="container-max">
          <div className="text-center mb-10">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label-tag text-terracotta-500 mb-3">Follow the Journey</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="instagram-heading" className="font-display text-4xl md:text-5xl font-light text-navy-900">
              @travelco
            </motion.h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-1 md:gap-2">
            {instagramImages.map((img, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative aspect-square overflow-hidden col-span-1 block"
                aria-label={`Instagram post ${i + 1}`}
              >
                <LazyLoadImage
                  src={img}
                  alt={`Instagram photo ${i + 1}`}
                  effect="blur"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  wrapperClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-all duration-300 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-20 text-center px-4" aria-label="Join us CTA">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="label-tag text-terracotta-400 mb-4">Ready to Travel?</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
            Let's Plan Your Journey
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-10 text-sm leading-relaxed">
            Every great trip starts with a conversation. Tell us where you want to go—we'll handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/destinations">Browse Tours</Button>
            <Button variant="outline-white" size="lg" href="/contact">Get in Touch</Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
