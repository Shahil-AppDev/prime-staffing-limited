import { ArrowRight, Phone, Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import type { SisterCompany } from '@/lib/prime-group-data'

interface CompanyPageTemplateProps {
  company: SisterCompany
  IconComponent: any
}

export default function CompanyPageTemplate({ company, IconComponent }: CompanyPageTemplateProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className={`section-padding bg-gradient-to-br ${company.accentColor} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl mb-6">
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              {company.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {company.sector}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href={`tel:${company.phone[0].replace(/\s/g, '')}`} className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border-2 border-white/20">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              About {company.name}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {company.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {company.services.map((service, index) => (
              <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-6 w-6 flex-shrink-0 mt-0.5 bg-gradient-to-br ${company.accentColor} bg-clip-text text-transparent`} />
                  <p className="text-gray-700 font-medium">{service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Why Choose {company.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br ${company.accentColor} bg-clip-text text-transparent mb-2">
                  Professional
                </div>
                <p className="text-gray-600">Expert team with years of experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br ${company.accentColor} bg-clip-text text-transparent mb-2">
                  Reliable
                </div>
                <p className="text-gray-600">Trusted by businesses across Mauritius</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br ${company.accentColor} bg-clip-text text-transparent mb-2">
                  Quality
                </div>
                <p className="text-gray-600">Premium service and products guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={`section-padding bg-gradient-to-br ${company.accentColor} text-white`}>
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact our team today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get a Free Quote
              <Mail className="ml-2 h-5 w-5" />
            </Link>
            <a href={`tel:${company.phone[0].replace(/\s/g, '')}`} className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border-2 border-white/20">
              <Phone className="mr-2 h-5 w-5" />
              {company.phone[0]}
            </a>
          </div>
          
          <div className="max-w-md mx-auto">
            <p className="text-sm opacity-75 mb-2">Email us at:</p>
            <a href={`mailto:${company.email}`} className="text-lg font-semibold hover:underline">
              {company.email}
            </a>
          </div>
        </div>
      </section>

      {/* Back to Companies */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <Link href="/companies" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            Back to All Companies
          </Link>
        </div>
      </section>
    </div>
  )
}
