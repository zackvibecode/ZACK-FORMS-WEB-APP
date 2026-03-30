'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-charcoal-900 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
      </div>

      {/* Dot grid decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 border border-brand-400/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-brand-300 text-sm font-semibold">12,000+ businesses already on board</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Your Next Lead Is
            <br />
            <span className="text-brand-400">One Form Away.</span>
          </h2>

          {/* Subtext */}
          <p className="text-charcoal-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Join thousands of businesses getting real customer responses, bookings, and orders — straight to WhatsApp. Free to start, no strings attached.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold text-lg rounded-2xl shadow-green hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Start Free Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-2xl border border-white/20 transition-all duration-200"
            >
              See Pricing Plans
            </a>
          </div>

          {/* Trust icons */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              'Free plan forever',
              'No credit card needed',
              'Setup in 2 minutes',
              'Cancel anytime',
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-charcoal-400 text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
