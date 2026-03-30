'use client'

import { motion } from 'framer-motion'
import {
  LayoutGrid,
  MessageCircle,
  Globe2,
  LayoutTemplate,
  Import,
  Bell,
  Smartphone,
  Palette,
} from 'lucide-react'

const features = [
  {
    icon: LayoutGrid,
    title: 'Drag & Drop Builder',
    description: 'Build any form visually. Reorder fields, add logic, and preview in real time with zero friction.',
    color: 'text-violet-600 bg-violet-50',
    border: 'hover:border-violet-200',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Delivery',
    description: 'Receive every form submission as a clean, structured WhatsApp message — directly on your phone.',
    color: 'text-brand-600 bg-brand-50',
    border: 'hover:border-brand-200',
  },
  {
    icon: Globe2,
    title: 'Multi-Language',
    description: 'Serve global customers. Your forms auto-adapt to any language with one-click translation.',
    color: 'text-blue-600 bg-blue-50',
    border: 'hover:border-blue-200',
  },
  {
    icon: LayoutTemplate,
    title: 'Ready-Made Templates',
    description: 'Start faster with 50+ professionally designed templates for every industry and use case.',
    color: 'text-amber-600 bg-amber-50',
    border: 'hover:border-amber-200',
  },
  {
    icon: Import,
    title: 'Google Forms Import',
    description: 'Already using Google Forms? Import your existing forms in one click and supercharge them.',
    color: 'text-red-600 bg-red-50',
    border: 'hover:border-red-200',
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description: 'Never miss a lead. Get notified the moment someone submits your form, even on the go.',
    color: 'text-pink-600 bg-pink-50',
    border: 'hover:border-pink-200',
  },
  {
    icon: Smartphone,
    title: 'Mobile-Optimized',
    description: 'Forms look stunning on any device. Customers on phones — your most important audience — get a flawless experience.',
    color: 'text-teal-600 bg-teal-50',
    border: 'hover:border-teal-200',
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'Add your logo, brand colors, and custom domain. Make every form feel like it belongs to your business.',
    color: 'text-indigo-600 bg-indigo-50',
    border: 'hover:border-indigo-200',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block px-3 py-1 bg-charcoal-100 text-charcoal-700 text-xs font-bold uppercase tracking-wider rounded-full border border-charcoal-200 mb-4">
            Everything You Need
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Packed With Features.<br />Refreshingly Simple.
          </h2>
          <p className="text-charcoal-500 text-lg">
            Everything a modern business needs to capture leads, handle bookings, and stay connected with customers.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`group bg-white rounded-2xl border border-slate-100 p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 cursor-default ${feature.border}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feature.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-charcoal-900 mb-2 text-base">{feature.title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
