'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const problems = [
  'Leads get buried in email or missed entirely',
  'Customers submit fake contact info',
  'Manual copy-paste from forms to WhatsApp',
  'Slow follow-ups mean lost bookings',
  'No single view of all customer requests',
  'Complicated form tools with steep learning curves',
]

const solutions = [
  'Every submission pings you on WhatsApp instantly',
  'Real names & numbers from verified WhatsApp accounts',
  'Responses flow to your inbox automatically',
  'Reply in one tap — customers hear from you in seconds',
  'All submissions organized in one clean dashboard',
  'Build a form in under 2 minutes, no experience needed',
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function ProblemSolution() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 mb-4">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Stop Losing Leads the Old Way
          </h2>
          <p className="text-charcoal-500 text-lg leading-relaxed">
            Traditional forms are slow, generic, and disconnected from how your customers actually communicate. Here's what changes.
          </p>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Without */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-red-50/50 border border-red-100 rounded-3xl p-7 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-xs font-semibold text-red-500 uppercase tracking-wider">Without Zack Forms</div>
                <div className="text-base font-bold text-charcoal-800">The Old, Broken Way</div>
              </div>
            </div>
            <ul className="space-y-3">
              {problems.map((problem, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-600" />
                  </div>
                  <span className="text-sm text-charcoal-600 leading-relaxed">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* With */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-brand-50/50 border border-brand-100 rounded-3xl p-7 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider">With Zack Forms</div>
                <div className="text-base font-bold text-charcoal-800">The Smarter New Way</div>
              </div>
            </div>
            <ul className="space-y-3">
              {solutions.map((solution, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-200 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-700" />
                  </div>
                  <span className="text-sm text-charcoal-700 leading-relaxed font-medium">{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-charcoal-500 text-sm">
            Join <span className="font-bold text-charcoal-800">12,000+ businesses</span> who switched to receiving leads on WhatsApp.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
