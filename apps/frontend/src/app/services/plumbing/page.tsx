import { CheckCircle, Droplet, Phone, Mail, Clock, Shield, Wrench } from 'lucide-react'
import Link from 'next/link'

export default function PlumbingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.15),transparent_50%)]" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-6">
              <Droplet className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Plumbing Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Professional plumbing services for commercial properties and industrial facilities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
              <a href="tel:+442012345678" className="btn-glass">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Plumber
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
              Our Plumbing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive plumbing solutions for all commercial and industrial needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-6 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-4">
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
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized plumbing solutions across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((area, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-glass">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <area.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {area.description}
                    </p>
                    <ul className="space-y-1">
                      {area.points.map((point, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
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
              Why Choose Our Plumbing Services?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {benefit.stat}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {benefit.label}
                </div>
                <div className="text-xs text-gray-600">
                  {benefit.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Standards */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Fully Certified & Compliant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All work meets or exceeds industry standards and regulations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {compliance.map((item, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-glass text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-gray-900">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6">
              <Droplet className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-display font-bold mb-4">
              24/7 Emergency Plumbing
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Burst pipes, leaks, and blockages don't wait. Our emergency team is ready to respond any time, day or night.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">1 Hour</div>
                <div className="text-sm font-semibold">Average Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm font-semibold">Always Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm font-semibold">Qualified Plumbers</div>
              </div>
            </div>
            <a href="tel:+442012345678" className="btn-glass bg-white/20 hover:bg-white/30 border-white/30">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Line: +44 20 1234 5678
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Need Professional Plumbing Services?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our expert team for a free consultation and competitive quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get a Free Quote
            </Link>
            <a href="tel:+442012345678" className="btn-glass">
              <Phone className="h-5 w-5 mr-2" />
              Call Us: +44 20 1234 5678
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
    description: 'Complete plumbing installations for offices, retail spaces, and commercial buildings.',
    icon: Wrench,
    features: [
      'New build plumbing',
      'Office fit-outs',
      'Retail installations',
      'Restaurant plumbing',
    ],
  },
  {
    title: 'Drainage Systems',
    description: 'Professional drainage and sewage system installation and maintenance.',
    icon: Droplet,
    features: [
      'Drain installation',
      'Sewage systems',
      'CCTV drain surveys',
      'Drain unblocking',
    ],
  },
  {
    title: 'Water Treatment',
    description: 'Advanced water treatment and filtration solutions for commercial use.',
    icon: Droplet,
    features: [
      'Water softeners',
      'Filtration systems',
      'Legionella control',
      'Water quality testing',
    ],
  },
  {
    title: 'Leak Detection',
    description: 'Advanced leak detection and repair services to prevent water damage.',
    icon: Droplet,
    features: [
      'Thermal imaging',
      'Acoustic detection',
      'Trace and access',
      'Emergency repairs',
    ],
  },
  {
    title: 'Pipe Maintenance',
    description: 'Comprehensive pipe maintenance and replacement services.',
    icon: Wrench,
    features: [
      'Pipe repairs',
      'Re-piping services',
      'Pipe insulation',
      'Preventive maintenance',
    ],
  },
  {
    title: 'Compliance Services',
    description: 'Ensure your plumbing systems meet all regulatory requirements.',
    icon: Shield,
    features: [
      'Safety inspections',
      'Certification services',
      'Compliance audits',
      'Documentation',
    ],
  },
]

const expertise = [
  {
    title: 'Commercial Properties',
    description: 'Specialized plumbing for offices, retail, and hospitality venues.',
    icon: Wrench,
    points: [
      'Office buildings and business parks',
      'Retail stores and shopping centers',
      'Hotels and restaurants',
      'Healthcare facilities',
    ],
  },
  {
    title: 'Industrial Facilities',
    description: 'Heavy-duty plumbing solutions for manufacturing and industrial sites.',
    icon: Droplet,
    points: [
      'Manufacturing plants',
      'Warehouses and distribution centers',
      'Food processing facilities',
      'Chemical and pharmaceutical plants',
    ],
  },
  {
    title: 'Water Systems',
    description: 'Complete water supply and distribution system expertise.',
    icon: Droplet,
    points: [
      'Hot and cold water systems',
      'Booster pump installations',
      'Water storage tanks',
      'Pressure regulation',
    ],
  },
  {
    title: 'Waste Management',
    description: 'Efficient waste water and drainage system solutions.',
    icon: Wrench,
    points: [
      'Waste water systems',
      'Grease trap installation',
      'Pumping stations',
      'Effluent treatment',
    ],
  },
]

const benefits = [
  {
    stat: '30+',
    label: 'Years Experience',
    description: 'Industry expertise',
  },
  {
    stat: '1000+',
    label: 'Projects Completed',
    description: 'Successful installations',
  },
  {
    stat: '24/7',
    label: 'Emergency Service',
    description: 'Always available',
  },
  {
    stat: '99%',
    label: 'Client Satisfaction',
    description: 'Proven track record',
  },
]

const compliance = [
  { icon: '✓', title: 'Water Regulations' },
  { icon: '🛡️', title: 'Health & Safety' },
  { icon: '📋', title: 'Building Regs' },
  { icon: '⚡', title: 'Gas Safe' },
  { icon: '💧', title: 'WRAS Approved' },
  { icon: '🔧', title: 'CIPHE Certified' },
  { icon: '✅', title: 'Fully Insured' },
  { icon: '📜', title: 'ISO Certified' },
]
