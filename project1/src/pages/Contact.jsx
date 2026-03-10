import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Accordion from "../components/ui/Accordion";
import Button from "../components/ui/Button";

const faqs = [
  {
    question: "How small are your groups?",
    answer:
      "We cap groups at a maximum of 14 people—most run with 8–12. This is a deliberate policy, not a cost decision. Smaller groups mean better access, more flexibility, and deeper experiences. It also means our footprint on sensitive environments is minimised.",
  },
  {
    question: "What happens if I need to cancel?",
    answer:
      "We offer free cancellation up to 90 days before departure for a full refund. 89–60 days: 50% refund. 59–30 days: 25% refund. Under 30 days: no refund, but we'll work with you on credit toward a future trip. We strongly recommend travel insurance.",
  },
  {
    question: "Are your tours suitable for solo travellers?",
    answer:
      "Absolutely—roughly 35% of our guests are solo travellers. Our groups are selected for compatibility. For solo travellers who want to avoid the single supplement, we offer a room-share programme for most tours. Just let us know when booking.",
  },
  {
    question: "What fitness level do I need?",
    answer:
      "It depends on the tour. Our difficulty ratings are: Easy (anyone who can walk for 3–4 hours at a time), Moderate (regular exercise required, some days of 6–8 hours walking), Challenging (strong fitness required, high altitude possible). Consult individual tour pages for specifics.",
  },
  {
    question: "Is everything included in the tour price?",
    answer:
      "Each tour's \"What's Included\" section is specific—check the tour page. As a general rule: accommodation, all guided activities, park fees, most meals, and in-country transfers are included. International flights, travel insurance, personal spending, and optional upgrades are not.",
  },
  {
    question: "Do you offer tailor-made or private tours?",
    answer:
      "Yes. We run private group departures for families, corporate groups, and friends starting at 6 people. We also create fully bespoke itineraries—contact us with your wishlist and we'll build something around it.",
  },
  {
    question: "How do you select your guides?",
    answer:
      "Every guide is local to their region, trained in wilderness first aid, and has completed our proprietary TravelCo guiding programme. Many have been with us for 5+ years. We never use freelance guides sourced on arrival—your guide's details are shared 4 weeks before departure.",
  },
  {
    question: "What is your sustainability approach?",
    answer:
      "We offset 200% of tour carbon emissions through Gold Standard-verified projects. A minimum of 40% of every tour fee must circulate within the local economy. We contribute directly to conservation projects in each destination. Read our full approach in the Journal.",
  },
];

const offices = [
  {
    city: "Pokhara",
    address: "Lakeside, Baidam-6, Pokhara 33700, Gandaki Province",
    phone: "+977 61 123 456",
    email: "pokhara@travelco.com",
  },
  {
    city: "Kathmandu",
    address: "Thamel, Kathmandu 44600, Bagmati Province",
    phone: "+977 1 456 7890",
    email: "kathmandu@travelco.com",
  },
  {
    city: "Chitwan",
    address: "Bharatpur-10, Chitwan 44200, Bagmati Province",
    phone: "+977 56 234 567",
    email: "chitwan@travelco.com",
  },
];

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-3xl font-medium text-navy-900 mb-3">
          Message Received
        </h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. A member of our team will respond within
          one business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-terracotta-500 hover:underline underline-offset-2"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const fieldClass = (hasError) =>
    `w-full border px-4 py-3 text-sm text-navy-900 bg-white placeholder-gray-300 focus:outline-none transition-colors min-h-[44px] ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-sand-200 focus:border-navy-900"
    }`;

  const errorMsg = (msg) => (
    <p role="alert" className="text-xs text-red-500 mt-1">
      {msg}
    </p>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label
            htmlFor="firstName"
            className="block label-tag text-navy-400 mb-2"
          >
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Sita"
            className={fieldClass(errors.firstName)}
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && errorMsg(errors.firstName.message)}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block label-tag text-navy-400 mb-2"
          >
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Thapa"
            className={fieldClass(errors.lastName)}
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && errorMsg(errors.lastName.message)}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block label-tag text-navy-400 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={fieldClass(errors.email)}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && errorMsg(errors.email.message)}
      </div>

      <div className="mb-5">
        <label htmlFor="phone" className="block label-tag text-navy-400 mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+977 98XXXXXXXX"
          className={fieldClass(errors.phone)}
          {...register("phone")}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="interest"
          className="block label-tag text-navy-400 mb-2"
        >
          I'm Interested In *
        </label>
        <select
          id="interest"
          className={fieldClass(errors.interest)}
          {...register("interest", { required: "Please select an option" })}
        >
          <option value="">Select an option</option>
          <option value="specific-tour">A specific tour</option>
          <option value="bespoke">Bespoke / private trip</option>
          <option value="general">General travel advice</option>
          <option value="press">Press & media</option>
          <option value="other">Other</option>
        </select>
        {errors.interest && errorMsg(errors.interest.message)}
      </div>

      <div className="mb-5">
        <label htmlFor="budget" className="block label-tag text-navy-400 mb-2">
          Approximate Budget (per person)
        </label>
        <select
          id="budget"
          className={fieldClass(false)}
          {...register("budget")}
        >
          <option value="">Prefer not to say</option>
          <option value="under50000">Under NPR 50,000</option>
          <option value="50000-150000">NPR 50,000–1,50,000</option>
          <option value="150000-300000">NPR 1,50,000–3,00,000</option>
          <option value="over300000">NPR 3,00,000+</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block label-tag text-navy-400 mb-2">
          Your Message *
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us where you'd like to go, when, and anything else that helps us help you…"
          className={`${fieldClass(errors.message)} resize-none`}
          {...register("message", {
            required: "Please write a message",
            minLength: {
              value: 20,
              message: "Please write at least 20 characters",
            },
          })}
        />
        {errors.message && errorMsg(errors.message.message)}
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-terracotta-500 flex-shrink-0"
            {...register("consent", { required: "You must agree to continue" })}
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            I agree to TravelCo contacting me about my enquiry. I understand I
            can unsubscribe at any time. View our{" "}
            <a href="#" className="text-terracotta-500 hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && errorMsg(errors.consent.message)}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <section
        className="relative pt-32 pb-16 bg-navy-950 overflow-hidden"
        aria-label="Contact header"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
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
            Say Hello
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-white"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-3 text-sm max-w-md mx-auto"
          >
            We reply to every message personally within one business day.
          </motion.p>
        </div>
      </section>

      {/* Contact cards */}
      <section
        className="max-w-7xl mx-auto px-4 md:px-8 py-12"
        aria-labelledby="offices-heading"
      >
        <h2 id="offices-heading" className="sr-only">
          Our Offices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {offices.map((office, i) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 shadow-sm"
            >
              <div className="w-10 h-10 bg-terracotta-50 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-terracotta-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-navy-900 mb-1">
                {office.city}
              </h3>
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                {office.address}
              </p>
              <a
                href={`tel:${office.phone}`}
                className="block text-sm text-navy-900 hover:text-terracotta-500 transition-colors mb-1"
              >
                {office.phone}
              </a>
              <a
                href={`mailto:${office.email}`}
                className="block text-sm text-terracotta-500 hover:text-terracotta-600 transition-colors"
              >
                {office.email}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Form + Map grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="label-tag text-terracotta-500 mb-3">Enquire Now</p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-navy-900 mb-2">
                Start Your Journey
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Whether you have a specific tour in mind or just a vague sense
                of wanderlust, we're here to help shape the perfect trip.
              </p>
              <div className="bg-white p-6 md:p-8 shadow-sm">
                <ContactForm />
              </div>
            </motion.div>
          </div>

          {/* Map + extra info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="label-tag text-terracotta-500 mb-3">Find Us</p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-navy-900 mb-8">
                Pokhara Lakeside HQ
              </h2>

              {/* Map embed — Pokhara Lakeside, Nepal */}
              <div className="overflow-hidden shadow-sm mb-6 h-72">
                <iframe
                  title="TravelCo Pokhara Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.0953974415!2d83.95610731503573!3d28.209660982591837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sLakeside%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1699000000000!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick info blocks */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: "🕐",
                    label: "Office Hours",
                    value: "Sun–Fri 9am–6pm NST",
                  },
                  {
                    icon: "⚡",
                    label: "Response Time",
                    value: "Within 1 business day",
                  },
                  {
                    icon: "📞",
                    label: "Emergency Line",
                    value: "24/7 for active guests",
                  },
                  {
                    icon: "🌍",
                    label: "Languages",
                    value: "NE, EN, HI, ZH, JA",
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-white p-4 shadow-sm">
                    <span className="text-lg mb-2 block">{item.icon}</span>
                    <p className="label-tag text-navy-400 mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-navy-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="label-tag text-terracotta-500 mb-3"
              >
                Common Questions
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                id="faq-heading"
                className="font-display text-4xl md:text-5xl font-light text-navy-900"
              >
                FAQs
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Accordion items={faqs} />
            </motion.div>
            <p className="text-center mt-8 text-sm text-gray-500">
              Still have questions?{" "}
              <a
                href="mailto:hello@travelco.com"
                className="text-terracotta-500 hover:underline underline-offset-2"
              >
                Email us directly
              </a>
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
