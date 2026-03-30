'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Is there a free plan?',
    a: 'Yes! Zack Forms has a forever-free plan that includes up to 3 active forms and 100 submissions per month. No credit card required to get started. Upgrade whenever you outgrow it.',
  },
  {
    q: 'Is my data secure?',
    a: "Absolutely. All form data is encrypted in transit and at rest. We're GDPR-compliant and never sell or share your data. You own everything your customers submit.",
  },
  {
    q: 'Can I receive responses directly on WhatsApp?',
    a: "Yes — that's the core of Zack Forms. Connect your WhatsApp number once, and every form submission is delivered as a clean, structured message to your WhatsApp in real time.",
  },
  {
    q: 'Can I use pre-built templates?',
    a: 'Yes. We offer 50+ ready-made templates for travel, food, events, retail, services, and more. Pick one, customize fields and branding, and publish in minutes.',
  },
  {
    q: 'Can I customize the branding and domain?',
    a: "On paid plans, you can fully white-label your forms — add your logo, brand colors, and custom domain. Your customers will see your brand, not Zack Forms's.",
  },
  {
    q: 'Does it work on mobile for customers filling forms?',
    a: "Forms are built mobile-first and look pixel-perfect on all devices. Most of your customers will fill forms on their phones — we've obsessed over that experience.",
  },
  {
    q: 'Can I import my existing Google Forms?',
    a: "Yes! Paste your Google Form link, and we'll import all your questions and field types automatically. You can then enhance them with WhatsApp delivery and better design.",
  },
  {
    q: 'How many WhatsApp numbers can I connect?',
    a: 'The free plan supports one WhatsApp number. Pro and Business plans allow multiple numbers — great for teams or multiple departments.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-charcoal-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-charcoal-800 font-semibold text-sm sm:text-base leading-snug">{q}</span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-brand-500 text-white' : 'bg-charcoal-100 text-charcoal-600'}`}>
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-charcoal-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-charcoal-100 text-charcoal-700 text-xs font-bold uppercase tracking-wider rounded-full border border-charcoal-200 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-charcoal-500 text-lg">
            Can't find what you're looking for?{' '}
            <a href="#" className="text-brand-600 font-medium hover:underline">
              Chat with us on WhatsApp.
            </a>
          </p>
        </motion.div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
