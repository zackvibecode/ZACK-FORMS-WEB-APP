'use client'

import { motion } from 'framer-motion'

const brands = [
  { name: 'TravelNest', icon: '✈️' },
  { name: 'Foodie Co.', icon: '🍽️' },
  { name: 'EventHub', icon: '🎪' },
  { name: 'MedBook', icon: '🏥' },
  { name: 'StyleMart', icon: '👗' },
  { name: 'LearnPath', icon: '📚' },
  { name: 'FitPro', icon: '💪' },
  { name: 'LegalEdge', icon: '⚖️' },
]

export default function SocialProof() {
  return (
    <section className="py-12 border-y border-slate-100 bg-charcoal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-charcoal-400 uppercase tracking-widest mb-8"
        >
          Trusted by 12,000+ businesses worldwide
        </motion.p>

        {/* Scrolling logos strip */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-[marquee_25s_linear_infinite]">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-soft transition-shadow"
              >
                <span className="text-lg">{brand.icon}</span>
                <span className="text-sm font-semibold text-charcoal-600 whitespace-nowrap">{brand.name}</span>
              </div>
            ))}
          </div>
              {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal-50/30 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal-50/30 to-transparent pointer-events-none" />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-slate-200"
        >
          {[
            { value: '12K+', label: 'Active businesses' },
            { value: '2.4M', label: 'Form submissions sent' },
            { value: '98%', label: 'WhatsApp delivery rate' },
            { value: '4.9★', label: 'Average rating' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold text-charcoal-900 mb-1">{value}</div>
              <div className="text-sm text-charcoal-500">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
