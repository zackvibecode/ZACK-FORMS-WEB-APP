'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

const EXAMPLE_PROMPTS = [
  "I run a travel agency and need to collect booking enquiries",
  "Restaurant that wants to take online orders via WhatsApp",
  "Freelance designer collecting project briefs from clients",
]

const GENERATED_FIELDS: Record<number, { label: string; type: string }[]> = {
  0: [
    { label: 'Your Full Name', type: 'text' },
    { label: 'Phone Number', type: 'phone' },
    { label: 'Destination', type: 'text' },
    { label: 'Travel Dates', type: 'date' },
    { label: 'Number of Travelers', type: 'number' },
    { label: 'Budget Range', type: 'select' },
  ],
  1: [
    { label: 'Customer Name', type: 'text' },
    { label: 'WhatsApp Number', type: 'phone' },
    { label: 'Table Size', type: 'select' },
    { label: 'Preferred Time', type: 'time' },
    { label: 'Special Requests', type: 'textarea' },
  ],
  2: [
    { label: 'Your Name', type: 'text' },
    { label: 'Email Address', type: 'email' },
    { label: 'Project Type', type: 'select' },
    { label: 'Project Description', type: 'textarea' },
    { label: 'Budget', type: 'number' },
    { label: 'Deadline', type: 'date' },
  ],
}

const typeColor: Record<string, string> = {
  text: 'bg-blue-100 text-blue-700',
  phone: 'bg-brand-100 text-brand-700',
  email: 'bg-purple-100 text-purple-700',
  date: 'bg-amber-100 text-amber-700',
  time: 'bg-pink-100 text-pink-700',
  number: 'bg-orange-100 text-orange-700',
  select: 'bg-teal-100 text-teal-700',
  textarea: 'bg-slate-100 text-slate-700',
}

export default function AIBuilder() {
  const [active, setActive] = useState(0)
  const [typing, setTyping] = useState(false)
  const [generated, setGenerated] = useState(true)

  const handlePrompt = (i: number) => {
    setTyping(true)
    setGenerated(false)
    setActive(i)
    setTimeout(() => {
      setTyping(false)
      setGenerated(true)
    }, 1200)
  }

  return (
    <section className="py-20 lg:py-28 bg-charcoal-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-xs font-semibold text-brand-300">AI Form Generator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5 leading-[1.15]">
              Describe Your Business.
              <br />
              <span className="text-brand-400">AI Builds the Form.</span>
            </h2>

            <p className="text-charcoal-300 text-lg leading-relaxed mb-8">
              No need to think about which fields to add. Just tell our AI what your business does — it generates the perfect form with the right questions, in seconds.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Perfect questions tailored to your industry',
                'Smart field types (date pickers, dropdowns, phone)',
                'Ready-to-share link in under 30 seconds',
                'Edit, reorder, or add fields after generation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-green"
            >
              Try AI Form Builder
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — interactive demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-charcoal-800 rounded-3xl border border-white/10 p-6 lg:p-7"
          >
            {/* Prompt input */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-semibold text-white">Try a prompt:</span>
              </div>
              <div className="space-y-2">
                {EXAMPLE_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePrompt(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 border ${
                      active === i
                        ? 'bg-brand-500/20 border-brand-400/50 text-brand-300'
                        : 'bg-white/5 border-white/10 text-charcoal-300 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Generated output */}
            <div className="bg-charcoal-900 rounded-2xl border border-white/10 p-4 min-h-[220px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
                  Generated Fields
                </span>
                {generated && (
                  <span className="flex items-center gap-1 text-xs text-brand-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {typing ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 py-8 justify-center"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, delay: dot * 0.2, repeat: Infinity }}
                          className="w-2 h-2 bg-brand-400 rounded-full"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-charcoal-400">Generating your form…</span>
                  </motion.div>
                ) : generated ? (
                  <motion.div
                    key="fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    {GENERATED_FIELDS[active].map((field, i) => (
                      <motion.div
                        key={field.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg border border-white/5"
                      >
                        <span className="text-sm text-white font-medium">{field.label}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[field.type]}`}>
                          {field.type}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
