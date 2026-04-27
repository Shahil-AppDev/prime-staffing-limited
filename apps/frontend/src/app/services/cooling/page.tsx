import { CheckCircle, Snowflake, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'

export default function CoolingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)]" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
              <Snowflake className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Prime Precision Cooling
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Expert HVAC and refrigeration solutions for commercial and industrial applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
              <a href="tel:+442012345678" className="btn-glass">
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
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
              Our Cooling Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive HVAC and refrigeration solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-6 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
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

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose Prime Precision Cooling?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-glass text-center">
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

      {/* Industries Served */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by businesses across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="card p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2">{industry.icon}</div>
                <div className="text-sm font-semibold text-gray-900">{industry.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Need Expert Cooling Solutions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact our team today for a free consultation and quote
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
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">24/7 Emergency</div>
                <div className="text-sm opacity-80">Always available</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Fast Response</div>
                <div className="text-sm opacity-80">Within 2 hours</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Expert Team</div>
                <div className="text-sm opacity-80">Certified engineers</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: 'Commercial HVAC',
    description: 'Complete heating, ventilation, and air conditioning systems for commercial properties.',
    icon: Snowflake,
    features: [
      'System design and installation',
      'Energy-efficient solutions',
      'Climate control systems',
      'Air quality management',
    ],
  },
  {
    title: 'Industrial Refrigeration',
    description: 'Heavy-duty refrigeration systems for industrial and manufacturing facilities.',
    icon: Snowflake,
    features: [
      'Cold storage solutions',
      'Process cooling systems',
      'Temperature monitoring',
      'Custom refrigeration',
    ],
  },
  {
    title: 'Maintenance Programs',
    description: 'Preventive maintenance to keep your systems running efficiently year-round.',
    icon: CheckCircle,
    features: [
      'Regular inspections',
      'Filter replacements',
      'Performance optimization',
      'Priority service',
    ],
  },
  {
    title: 'Emergency Repairs',
    description: '24/7 emergency repair services to minimize downtime and restore comfort.',
    icon: Phone,
    features: [
      '24/7 availability',
      'Rapid response time',
      'Expert diagnostics',
      'Same-day repairs',
    ],
  },
  {
    title: 'Energy Audits',
    description: 'Comprehensive energy efficiency assessments to reduce costs and carbon footprint.',
    icon: CheckCircle,
    features: [
      'System efficiency analysis',
      'Cost-saving recommendations',
      'ROI calculations',
      'Upgrade planning',
    ],
  },
  {
    title: 'System Upgrades',
    description: 'Modern retrofits and upgrades to improve performance and efficiency.',
    icon: Snowflake,
    features: [
      'Smart controls installation',
      'Equipment replacement',
      'System optimization',
      'Technology integration',
    ],
  },
]

const benefits = [
  {
    stat: '25+',
    label: 'Years Experience',
    description: 'Industry expertise',
  },
  {
    stat: '500+',
    label: 'Projects Completed',
    description: 'Successful installations',
  },
  {
    stat: '24/7',
    label: 'Emergency Service',
    description: 'Always available',
  },
  {
    stat: '98%',
    label: 'Client Satisfaction',
    description: 'Proven track record',
  },
]

const industries = [
  { name: 'Hospitality', icon: '🏨' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Retail', icon: '🏪' },
  { name: 'Manufacturing', icon: '🏭' },
  { name: 'Food & Beverage', icon: '🍽️' },
  { name: 'Data Centers', icon: '💻' },
  { name: 'Education', icon: '🎓' },
  { name: 'Logistics', icon: '📦' },
]
