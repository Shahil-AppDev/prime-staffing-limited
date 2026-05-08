import { sisterCompanies } from '@/lib/prime-group-data'
import { ArrowRight, Blinds, Building2, Heart, Leaf, Mail, Paintbrush, Phone, Snowflake, Truck } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, any> = {
  Paintbrush,
  Snowflake,
  Truck,
  Leaf,
  Blinds,
  Heart
}

export const metadata = {
  title: 'Our Companies | Prime Group Ltd',
  description: 'Discover the sister companies of Prime Group Ltd operating across decoration, cooling, logistics, renewable energy, blinds manufacturing and healthcare in Mauritius.'
}

export default function CompaniesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2),transparent_50%)]" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our Sister Companies
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Prime Group Ltd operates across six specialized sectors, delivering excellence and innovation throughout Mauritius.
            </p>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sisterCompanies.map((company, index) => {
              const IconComponent = iconMap[company.icon] || Building2

              return (
                <Link
                  key={company.slug}
                  href={`/companies/${company.slug}`}
                  className="group"
                >
                  <div className="card p-8 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${company.accentColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Company Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </h3>

                    {/* Sector */}
                    <p className="text-sm font-semibold text-blue-600 mb-4">
                      {company.sector}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {company.shortDescription}
                    </p>

                    {/* Services Preview */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Key Services:</p>
                      <ul className="space-y-1">
                        {company.services.slice(0, 3).map((service, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {service}
                          </li>
                        ))}
                        {company.services.length > 3 && (
                          <li className="text-sm text-blue-600 font-medium">
                            +{company.services.length - 3} more services
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Need Expert Solutions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Contact Prime Group Ltd to discuss your project with our specialized teams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us
              <Mail className="ml-2 h-5 w-5" />
            </Link>
            <a href="tel:+2305538129" className="inline-flex items-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white/20">
              <Phone className="mr-2 h-5 w-5" />
              +230 5538 1294
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
