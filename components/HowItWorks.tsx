'use client'

import { motion } from 'framer-motion'
import { LayoutTemplate, Share2, MessageCircle } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: LayoutTemplate,
    title: 'Build Your Form',
    description:
      'Use our drag-and-drop builder — or let AI generate the perfect form from a one-line description of your business. No code, no design skills needed.',
    color: 'bg-violet-50 border-violet-100',
    iconColor: 'bg-violet-100 text-violet-600',
    accent: '#7c3aed',
  },
  {
    step: '02',
    icon: Share2,
    title: 'Share Your Link',
    description:
      'Get a beautiful, mobile-ready link instantly. Share it on Instagram bio, your website, or send it directly to customers via any channel.',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'bg-blue-100 text-blue-600',
    accent: '#2563eb',
  },
  {
    step: '03',
    icon: MessageCircle,
    title: 'Get Replies on WhatsApp',
    description:
      'Every form submission arrives as a structured WhatsApp message — customer name, contact, and their answers, right where you already work.',
    color: 'bg-brand-50 border-brand-100',
    iconColor: 'bg-brand-100 text-brand-600',
    accent: '#16a34a',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-100 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Three Steps to Your First Lead
          </h2>
          <p className="text-charcoal-500 text-lg">
            From zero to collecting responses in under 2 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-violet-200 via-blue-200 to-brand-200" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative bg-white rounded-3xl border p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 ${step.color}`}
              >
                {/* Step number */}
                <div className="absolute -top-3 left-7">
                  <span className="inline-block px-2.5 py-0.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-charcoal-500 shadow-sm">
                    Step {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 mt-2 ${step.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-charcoal-900 mb-3">{step.title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-2xl shadow-green hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Create Your First Form Free
          </a>
          <p className="text-charcoal-400 text-sm mt-3">No account required to try the builder</p>
        </motion.div>
      </div>
    </section>
  )
}
