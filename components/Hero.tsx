'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function FormMockup() {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Form builder card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative bg-white rounded-2xl shadow-soft-lg border border-slate-100 p-5 z-10"
      >
        {/* Header bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-brand-400" />
          <div className="flex-1 h-5 bg-slate-100 rounded-md ml-2" />
        </div>

        {/* Form title */}
        <div className="text-xs font-semibold text-charcoal-800 mb-3">✨ Travel Booking Inquiry</div>

        {/* Form fields */}
        <div className="space-y-2.5">
          {['Your Full Name', 'Destination City', 'Travel Date'].map((placeholder, i) => (
            <div key={i} className="group">
              <div className="text-[10px] font-medium text-charcoal-500 mb-1">{placeholder}</div>
              <div className="h-8 bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 group-hover:border-brand-300 transition-colors">
                <div className={`h-2 rounded-full bg-slate-200 ${i === 0 ? 'w-20' : i === 1 ? 'w-14' : 'w-10'}`} />
              </div>
            </div>
          ))}

          {/* Radio field */}
          <div>
            <div className="text-[10px] font-medium text-charcoal-500 mb-1.5">Number of Guests</div>
            <div className="flex gap-2">
              {['1–2', '3–5', '6+'].map((opt, i) => (
                <div
                  key={opt}
                  className={`flex-1 h-7 rounded-lg text-[10px] font-medium flex items-center justify-center border transition-colors ${
                    i === 0
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'bg-slate-50 text-charcoal-500 border-slate-200'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <div className="h-9 bg-brand-500 rounded-xl flex items-center justify-center gap-1.5 mt-1">
            <span className="text-[11px] font-bold text-white">Send via WhatsApp</span>
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* WhatsApp message bubble — floating beside */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative -mt-6 ml-auto mr-0 w-64 bg-white rounded-2xl shadow-soft-lg border border-slate-100 p-4 z-20"
      >
        {/* WA header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-bold text-charcoal-800">Zack Forms Bot</div>
            <div className="text-[10px] text-brand-500 font-medium">● Online</div>
          </div>
        </div>

        {/* Message bubble */}
        <div className="bg-brand-50 rounded-xl rounded-tl-sm p-3 border border-brand-100">
          <div className="text-[10px] font-semibold text-charcoal-700 mb-1.5">📋 New Submission!</div>
          <div className="space-y-0.5">
            {[
              ['Name', 'Sarah Johnson'],
              ['Destination', 'Bali, Indonesia'],
              ['Date', 'July 15, 2025'],
              ['Guests', '1–2 people'],
            ].map(([label, value]) => (
              <div key={label} className="text-[10px] text-charcoal-600">
                <span className="font-medium">{label}:</span> {value}
              </div>
            ))}
          </div>
          <div className="text-[9px] text-charcoal-400 mt-2 text-right">Just now ✓✓</div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden gradient-hero">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-brand-50/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span className="text-xs font-semibold text-brand-700">AI-Powered Form Builder</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 leading-[1.1] tracking-tight mb-5"
            >
              Build Forms.
              <br />
              <span className="text-brand-500">Get Leads on</span>
              <br />
              WhatsApp.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-charcoal-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Create stunning no-code forms in minutes. Every response lands straight in your WhatsApp — no missed leads, no manual chasing, no tech skills needed.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5"
            >
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-2xl shadow-green hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-base"
              >
                Create Free Form
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-charcoal-700 font-semibold rounded-2xl border border-charcoal-200 hover:border-charcoal-300 hover:bg-charcoal-50 transition-all duration-200 text-base"
              >
                <Play className="w-4 h-4 text-brand-500 fill-brand-500" />
                Watch Demo
              </a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center lg:justify-start"
            >
              {['No credit card required', 'No coding required', 'Free forever plan'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-charcoal-500">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            <FormMockup />

            {/* Stats badge floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-soft-lg border border-slate-100 px-4 py-3 hidden lg:block"
            >
              <div className="text-xs text-charcoal-500 mb-0.5">Responses today</div>
              <div className="text-2xl font-bold text-charcoal-900">1,284</div>
              <div className="text-xs text-brand-500 font-medium">+18% vs yesterday</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Badge pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mt-14"
        >
          {[
            { label: 'No Code', color: 'bg-violet-50 text-violet-700 border-violet-200' },
            { label: 'WhatsApp Native', color: 'bg-brand-50 text-brand-700 border-brand-200' },
            { label: 'AI Powered', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            { label: 'Free Plan', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Mobile First', color: 'bg-pink-50 text-pink-700 border-pink-200' },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${color}`}
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
