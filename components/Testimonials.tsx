'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Amara Osei',
    role: 'Owner',
    company: 'Sunridge Travel',
    avatar: 'AO',
    color: 'bg-violet-500',
    stars: 5,
    text: "Zack Forms completely changed how we take travel bookings. Before, we'd miss leads in email. Now every inquiry hits our WhatsApp within seconds. We've doubled our response rate.",
  },
  {
    name: 'Diego Morales',
    role: 'Head of Marketing',
    company: 'FreshKitchen Co.',
    avatar: 'DM',
    color: 'bg-blue-500',
    stars: 5,
    text: "Setting up our restaurant order form took 4 minutes. Not an exaggeration. We now get 30+ orders a day straight into WhatsApp. It's absurdly easy to use.",
  },
  {
    name: 'Priya Nair',
    role: 'Freelance Consultant',
    company: 'PNDesign Studio',
    avatar: 'PN',
    color: 'bg-pink-500',
    stars: 5,
    text: "I was skeptical but the AI form generator blew me away. I typed one sentence about my business and got a perfect project intake form. My clients love how professional it looks.",
  },
  {
    name: 'James Kiptoo',
    role: 'Operations Manager',
    company: 'EventSphere Agency',
    avatar: 'JK',
    color: 'bg-amber-500',
    stars: 5,
    text: "We use Zack Forms for every event registration. Custom branding makes it look like our own product. The WhatsApp notifications mean we never have to check a separate dashboard.",
  },
  {
    name: 'Sofia Andersson',
    role: 'Founder',
    company: 'Bloom Boutique',
    avatar: 'SA',
    color: 'bg-teal-500',
    stars: 5,
    text: "Running a small shop, I needed something simple. Zack Forms is exactly that. No setup headaches, no monthly software fees eating into margins. Our customers actually enjoy filling in the forms.",
  },
  {
    name: 'Ravi Menon',
    role: 'CEO',
    company: 'LearnFast Academy',
    avatar: 'RM',
    color: 'bg-indigo-500',
    stars: 5,
    text: "We enroll students via Zack Forms now. Importing our old Google Form took about 30 seconds. Within the first week, our enrollment completion rate jumped 40%. The WhatsApp touch makes all the difference.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-charcoal-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-100 mb-4">
            Real Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Businesses Love Zack Forms
          </h2>
          <p className="text-charcoal-500 text-lg">
            Thousands of businesses switched — here's what they say after one month.
          </p>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array(t.stars)
                  .fill(0)
                  .map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal-700 text-sm leading-relaxed mb-5">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-charcoal-900">{t.name}</div>
                  <div className="text-xs text-charcoal-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-soft">
            <div className="flex gap-0.5">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-charcoal-800 font-bold text-lg">4.9</span>
            <span className="text-charcoal-500 text-sm">from 3,200+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
