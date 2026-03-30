'use client'

import Logo from '@/components/Logo'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'AI Builder', href: '#' },
    { label: 'Integrations', href: '#' },
    { label: 'Pricing', href: '#pricing' },
    { label: "What's New", href: '#' },
  ],
  Tools: [
    { label: 'Form Builder', href: '#' },
    { label: 'Google Forms Import', href: '#' },
    { label: 'WhatsApp Connect', href: '#' },
    { label: 'Analytics', href: '#' },
    { label: 'Custom Domain', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'WhatsApp Chat', href: '#' },
    { label: 'Status Page', href: '#' },
    { label: 'Community', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-charcoal-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="pt-14 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Logo size={36} textSize="text-xl" dark />
            </div>
            <p className="text-sm leading-relaxed text-charcoal-500 mb-5 max-w-xs">
              Build no-code forms. Receive every customer response instantly on WhatsApp.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { label: 'Twitter', icon: '𝕏' },
                { label: 'LinkedIn', icon: 'in' },
                { label: 'Instagram', icon: '📷' },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-brand-500/20 border border-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-charcoal-400 hover:text-brand-400 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-charcoal-500 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-600">
            © {new Date().getFullYear()} Zack Forms. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-charcoal-600">
            <span>Made with</span>
            <span className="text-red-500">♥</span>
            <span>for businesses worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
