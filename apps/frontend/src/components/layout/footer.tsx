import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-4">Prime Group Ltd</h3>
            <p className="text-gray-400">
              Diversified business solutions across decoration, cooling, logistics, renewable energy, blinds manufacturing and healthcare in Mauritius.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Our Companies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/companies/prime-concept-decor" className="hover:text-primary-400 transition-colors">
                  Prime Concept Decor
                </Link>
              </li>
              <li>
                <Link href="/companies/prime-precision-cooling" className="hover:text-primary-400 transition-colors">
                  Prime Precision Cooling
                </Link>
              </li>
              <li>
                <Link href="/companies/prime-green-technology" className="hover:text-primary-400 transition-colors">
                  Prime Green Technology
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-primary-400 transition-colors">
                  View All Companies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Mauritius</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+2305538129" className="hover:text-primary-400 transition-colors">
                  +230 5538 129
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+2305252507" className="hover:text-primary-400 transition-colors">
                  +230 5252 507
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Prime Group Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
