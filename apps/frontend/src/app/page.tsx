'use client'

import { primeGroupInfo, sisterCompanies } from '@/lib/prime-group-data'
import { motion } from 'framer-motion'
import { ArrowRight, Blinds, Building2, CheckCircle, Heart, Leaf, Paintbrush, Phone, Snowflake, Truck } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, any> = {
  Paintbrush,
  Snowflake,
  Truck,
  Leaf,
  Blinds,
  Heart
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_50%)]" />

        <div className="container-custom relative z-10 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6"
            >
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Diversified Business Group</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
            >
              Prime Group Ltd
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-4"
            >
              {primeGroupInfo.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-blue-200 mb-8 max-w-3xl mx-auto"
            >
              {primeGroupInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/companies" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                Explore Our Companies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white rounded-lg font-semibold transition-colors border-2 border-white/20">
                Contact Prime Group
                <Phone className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-blue-200"
            >
              <p className="text-sm mb-2">Contact us:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:+2305538129" className="hover:text-white transition-colors">
                  {primeGroupInfo.phone[0]}
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="tel:+2305252507" className="hover:text-white transition-colors">
                  {primeGroupInfo.phone[1]}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sister Companies Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Our Sister Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six specialized companies delivering excellence across multiple sectors in Mauritius
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sisterCompanies.map((company, index) => {
              const IconComponent = iconMap[company.icon] || Building2

              return (
                <motion.div
                  key={company.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/companies/${company.slug}`} className="group block h-full">
                    <div className="card p-8 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${company.accentColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {company.name}
                      </h3>

                      <p className="text-sm font-semibold text-blue-600 mb-4">
                        {company.sector}
                      </p>

                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {company.shortDescription}
                      </p>

                      <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/companies" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              View All Companies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Prime Group */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Why Choose Prime Group Ltd?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted expertise across multiple industries with a commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {primeGroupInfo.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering specialized solutions across diverse sectors in Mauritius
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              'Residential',
              'Commercial',
              'Industrial',
              'Healthcare',
              'Hospitality',
              'Retail',
              'Education',
              'Government'
            ].map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-gray-900">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Ready to Work with Prime Group Ltd?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Contact us today to discuss your project with our specialized teams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="tel:+2305538129" className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white rounded-lg font-semibold transition-colors border-2 border-white/20">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
