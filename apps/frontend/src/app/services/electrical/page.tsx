import { CheckCircle, Zap, Phone, Mail, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function ElectricalPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,179,8,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.15),transparent_50%)]" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-orange-500 mb-6">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Electrical Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Comprehensive electrical solutions from installation to maintenance and emergency repairs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
              <a href="tel:+442012345678" className="btn-glass">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Call-Out
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Electrical Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional electrical solutions for commercial and industrial properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-6 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Safety */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Certified & Compliant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All work carried out to the highest industry standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-glass text-center">
                <div className="text-4xl mb-3">{cert.icon}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {cert.title}
                </div>
                <div className="text-xs text-gray-600">
                  {cert.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose Our Electrical Services?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600 mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              24/7 Emergency Electrical Services
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Electrical emergencies don't wait for business hours. Our team is available around the clock to respond to urgent electrical issues.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-glass">
                <div className="text-3xl font-bold text-red-600 mb-2">2 Hours</div>
                <div className="text-sm font-semibold text-gray-900">Response Time</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-glass">
                <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-sm font-semibold text-gray-900">Availability</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-glass">
                <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-sm font-semibold text-gray-900">Certified Engineers</div>
              </div>
            </div>
            <a href="tel:+442012345678" className="btn-primary bg-red-600 hover:bg-red-700">
              <Phone className="h-5 w-5 mr-2" />
              Call Emergency Line: +44 20 1234 5678
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-yellow-600 to-orange-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Need Professional Electrical Services?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact our certified electricians for a free consultation and competitive quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-glass bg-white/20 hover:bg-white/30 border-white/30">
              Get a Free Quote
            </Link>
            <a href="tel:+442012345678" className="btn-glass bg-white/20 hover:bg-white/30 border-white/30">
              <Phone className="h-5 w-5 mr-2" />
              +44 20 1234 5678
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: 'Commercial Installations',
    description: 'Complete electrical installations for offices, retail, and commercial buildings.',
    icon: Zap,
    features: [
      'New build installations',
      'Office fit-outs',
      'Retail lighting systems',
      'Power distribution',
    ],
  },
  {
    title: 'Industrial Power',
    description: 'Heavy-duty electrical systems for manufacturing and industrial facilities.',
    icon: Zap,
    features: [
      'Three-phase power systems',
      'Motor controls',
      'Industrial machinery wiring',
      'High-voltage installations',
    ],
  },
  {
    title: 'Lighting Solutions',
    description: 'Energy-efficient lighting design and installation for all applications.',
    icon: Zap,
    features: [
      'LED lighting upgrades',
      'Emergency lighting',
      'Exterior lighting',
      'Smart lighting controls',
    ],
  },
  {
    title: 'Safety Inspections',
    description: 'Comprehensive electrical safety testing and certification services.',
    icon: Shield,
    features: [
      'PAT testing',
      'EICR certificates',
      'Fire alarm testing',
      'Compliance audits',
    ],
  },
  {
    title: 'Generator Services',
    description: 'Backup power solutions including installation and maintenance.',
    icon: Zap,
    features: [
      'Generator installation',
      'UPS systems',
      'Load testing',
      'Maintenance contracts',
    ],
  },
  {
    title: 'Emergency Repairs',
    description: '24/7 emergency electrical repair services for urgent issues.',
    icon: Phone,
    features: [
      'Power outage resolution',
      'Fault finding',
      'Circuit repairs',
      'Same-day service',
    ],
  },
]

const certifications = [
  {
    icon: '✓',
    title: 'NICEIC Approved',
    description: 'Registered contractor',
  },
  {
    icon: '⚡',
    title: 'Part P Certified',
    description: 'Building regulations',
  },
  {
    icon: '🛡️',
    title: 'Fully Insured',
    description: '£10M liability cover',
  },
  {
    icon: '📋',
    title: 'BS 7671 Compliant',
    description: 'Wiring regulations',
  },
]

const benefits = [
  {
    title: 'Certified Engineers',
    description: 'All our electricians are fully qualified, certified, and regularly trained on the latest regulations and technologies.',
    icon: Shield,
  },
  {
    title: 'Quality Guaranteed',
    description: 'We stand behind our work with comprehensive warranties and guarantees on all installations and repairs.',
    icon: CheckCircle,
  },
  {
    title: 'Competitive Pricing',
    description: 'Transparent, competitive pricing with no hidden costs. Free quotes and detailed breakdowns provided.',
    icon: Zap,
  },
]
