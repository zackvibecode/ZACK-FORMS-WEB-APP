'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect to get started and test the waters.',
    cta: 'Start Free',
    ctaStyle: 'border-2 border-charcoal-200 text-charcoal-700 hover:border-brand-400 hover:text-brand-600',
    highlight: false,
    features: [
      '3 active forms',
      '100 submissions / month',
      '1 WhatsApp number',
      'Basic templates',
      'Zack Forms branding',
      'Email support',
    ],
    missing: ['Custom branding', 'Custom domain', 'Analytics dashboard', 'Priority support'],
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 15 },
    description: 'For growing businesses that need more power.',
    cta: 'Start 14-Day Free Trial',
    ctaStyle: 'bg-brand-500 hover:bg-brand-600 text-white shadow-green',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited active forms',
      '5,000 submissions / month',
      '3 WhatsApp numbers',
      'All 50+ templates',
      'Custom branding & logo',
      'Custom domain',
      'Analytics dashboard',
      'Priority email support',
    ],
    missing: [],
  },
  {
    name: 'Business',
    price: { monthly: 49, yearly: 39 },
    description: 'For teams and agencies handling high volume.',
    cta: 'Contact Sales',
    ctaStyle: 'border-2 border-charcoal-200 text-charcoal-700 hover:border-brand-400 hover:text-brand-600',
    highlight: false,
    features: [
      'Unlimited everything',
      'Unlimited submissions',
      'Unlimited WhatsApp numbers',
      'Team members & roles',
      'API access',
      'White-label solution',
      'Google Forms import',
      'Dedicated account manager',
    ],
    missing: [],
  },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-100 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-charcoal-500 text-lg mb-8">
            Start free. Upgrade when you're ready. No hidden fees, ever.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-charcoal-100 rounded-2xl p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                !yearly ? 'bg-white text-charcoal-900 shadow-sm' : 'text-charcoal-500 hover:text-charcoal-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly ? 'bg-white text-charcoal-900 shadow-sm' : 'text-charcoal-500 hover:text-charcoal-700'
              }`}
            >
              Yearly
              <span className="text-[10px] font-bold bg-brand-500 text-white px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 lg:p-8 border transition-all duration-300 ${
                plan.highlight
                  ? 'bg-charcoal-900 border-charcoal-800 text-white shadow-soft-lg scale-105'
                  : 'bg-white border-slate-200 hover:border-brand-200 hover:shadow-soft'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full shadow-green">
                    <Zap className="w-3 h-3 fill-white" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${plan.highlight ? 'text-brand-400' : 'text-charcoal-500'}`}>
                {plan.name}
              </div>

              {/* Price */}
              <div className="flex items-end gap-1 mb-1">
                <span className={`text-5xl font-extrabold ${plan.highlight ? 'text-white' : 'text-charcoal-900'}`}>
                  ${yearly ? plan.price.yearly : plan.price.monthly}
                </span>
                {plan.price.monthly > 0 && (
                  <span className={`text-sm mb-2 ${plan.highlight ? 'text-charcoal-400' : 'text-charcoal-400'}`}>
                    /mo
                  </span>
                )}
              </div>

              <p className={`text-sm mb-6 ${plan.highlight ? 'text-charcoal-400' : 'text-charcoal-500'}`}>
                {plan.description}
              </p>

              {/* CTA */}
              <a
                href="#"
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 mb-7 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-brand-500" />
                    </div>
                    <span className={`text-sm ${plan.highlight ? 'text-charcoal-200' : 'text-charcoal-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-charcoal-400 text-sm mt-10"
        >
          🔒 14-day money-back guarantee · No questions asked · Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}
