'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const templates = [
  {
    emoji: '✈️',
    title: 'Travel Booking',
    description: 'Collect destination, dates, group size, and preferences. Perfect for travel agencies and tour operators.',
    fields: ['Name', 'Destination', 'Travel Dates', 'Budget'],
    color: 'from-blue-50 to-sky-50 border-blue-100',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    emoji: '📬',
    title: 'Contact Form',
    description: 'A clean, professional way for potential customers to reach you with questions or requests.',
    fields: ['Name', 'Email', 'Phone', 'Message'],
    color: 'from-slate-50 to-charcoal-50 border-slate-100',
    badge: null,
    badgeColor: '',
  },
  {
    emoji: '⭐',
    title: 'Feedback Form',
    description: 'Gather honest customer feedback, ratings, and suggestions to improve your service.',
    fields: ['Rating', 'Experience', 'Suggestions', 'Name'],
    color: 'from-amber-50 to-yellow-50 border-amber-100',
    badge: null,
    badgeColor: '',
  },
  {
    emoji: '🍽️',
    title: 'Restaurant Order',
    description: 'Let customers browse, customize, and place orders directly — confirmed on your WhatsApp.',
    fields: ['Items', 'Qty', 'Delivery Address', 'Time'],
    color: 'from-orange-50 to-red-50 border-orange-100',
    badge: 'New',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    emoji: '🛍️',
    title: 'Store Order',
    description: 'Perfect for small shops and online stores to collect product orders and shipping info.',
    fields: ['Product', 'Size/Color', 'Quantity', 'Address'],
    color: 'from-pink-50 to-rose-50 border-pink-100',
    badge: null,
    badgeColor: '',
  },
  {
    emoji: '🎟️',
    title: 'Event Registration',
    description: 'Register attendees for workshops, events, or webinars and confirm via WhatsApp.',
    fields: ['Full Name', 'Email', 'Ticket Type', 'Dietary'],
    color: 'from-violet-50 to-purple-50 border-violet-100',
    badge: null,
    badgeColor: '',
  },
]

export default function Templates() {
  return (
    <section id="templates" className="py-20 lg:py-28 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-100 mb-4">
            Templates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Start With a Template
          </h2>
          <p className="text-charcoal-500 text-lg">
            50+ industry-ready templates. Pick one, customize in seconds, and start collecting responses.
          </p>
        </motion.div>

        {/* Template grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((template, i) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`group relative bg-gradient-to-br ${template.color} border rounded-3xl p-6 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              {/* Badge */}
              {template.badge && (
                <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${template.badgeColor}`}>
                  {template.badge}
                </span>
              )}

              {/* Emoji */}
              <div className="text-3xl mb-4">{template.emoji}</div>

              <h3 className="text-lg font-bold text-charcoal-900 mb-2">{template.title}</h3>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-4">{template.description}</p>

              {/* Fields preview */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {template.fields.map((field) => (
                  <span
                    key={field}
                    className="text-[11px] font-medium bg-white/70 text-charcoal-600 px-2.5 py-1 rounded-full border border-white/80"
                  >
                    {field}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-700 group-hover:text-brand-600 transition-colors">
                Use Template
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Browse all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3 border-2 border-charcoal-200 text-charcoal-700 font-semibold rounded-2xl hover:border-brand-400 hover:text-brand-600 transition-all duration-200"
          >
            Browse All 50+ Templates
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
