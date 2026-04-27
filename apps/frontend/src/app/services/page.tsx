import { CheckCircle, Droplet, Snowflake, Zap } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive staffing and technical services tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Core Staffing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional recruitment solutions for your workforce needs
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="card p-8">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Divisions Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Divisions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized technical services delivered by expert teams
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {divisions.map((division, index) => (
              <Link
                key={index}
                href={division.href}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/20 shadow-glass p-8 h-full transition-all duration-500 hover:scale-105 hover:shadow-glow">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-blue-500 to-cyan-500" />

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${division.iconBg} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <division.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:gradient-text transition-all duration-300">
                    {division.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {division.description}
                  </p>

                  {/* Services List */}
                  <ul className="space-y-2">
                    {division.services.map((service, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover Arrow */}
                  <div className="mt-6 flex items-center text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A streamlined approach to bringing your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: 'Permanent Recruitment',
    description: 'Find the perfect long-term talent to drive your business forward with our comprehensive recruitment services.',
    features: [
      'Executive search and selection',
      'Mid-level professional placement',
      'Graduate recruitment programs',
      'Diversity and inclusion hiring',
      'Competency-based assessments',
      'Onboarding support',
    ],
  },
  {
    title: 'Temporary Staffing',
    description: 'Flexible workforce solutions to meet your changing business demands with qualified professionals.',
    features: [
      'Short-term contract staff',
      'Seasonal workforce solutions',
      'Project-based teams',
      'Interim management',
      'Rapid deployment services',
      'Payroll management',
    ],
  },
  {
    title: 'Executive Search',
    description: 'Strategic leadership recruitment for C-suite and senior management positions.',
    features: [
      'Board-level appointments',
      'C-suite executive search',
      'Leadership assessment',
      'Succession planning',
      'Market mapping',
      'Confidential searches',
    ],
  },
  {
    title: 'Workforce Consulting',
    description: 'Strategic HR consulting to optimize your talent management and organizational effectiveness.',
    features: [
      'Workforce planning',
      'Talent strategy development',
      'Organizational design',
      'HR process optimization',
      'Employer branding',
      'Market insights and analytics',
    ],
  },
]

const divisions = [
  {
    title: 'Prime Precision Cooling',
    description: 'Expert HVAC and refrigeration solutions for commercial and industrial applications.',
    icon: Snowflake,
    iconBg: 'from-blue-500 to-cyan-500',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    href: '/services/cooling',
    services: [
      'Commercial HVAC installation',
      'Industrial refrigeration systems',
      'Preventive maintenance programs',
      'Emergency repair services',
      'Energy efficiency audits',
      'System upgrades and retrofits',
    ],
  },
  {
    title: 'Electrical Services',
    description: 'Comprehensive electrical solutions from installation to maintenance and emergency repairs.',
    icon: Zap,
    iconBg: 'from-yellow-500 to-orange-500',
    gradient: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
    href: '/services/electrical',
    services: [
      'Commercial electrical installations',
      'Industrial power systems',
      'Lighting design and installation',
      'Electrical safety inspections',
      'Generator installation and service',
      '24/7 emergency call-out',
    ],
  },
  {
    title: 'Plumbing Services',
    description: 'Professional plumbing services for commercial properties and industrial facilities.',
    icon: Droplet,
    iconBg: 'from-blue-600 to-indigo-600',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
    href: '/services/plumbing',
    services: [
      'Commercial plumbing installation',
      'Drainage and sewage systems',
      'Water treatment solutions',
      'Leak detection and repair',
      'Pipe maintenance and replacement',
      'Compliance and certification',
    ],
  },
]

const process = [
  {
    title: 'Consultation',
    description: 'We discuss your vision, needs, and budget',
  },
  {
    title: 'Design',
    description: 'We create detailed plans and 3D visualizations',
  },
  {
    title: 'Review',
    description: 'We refine the design based on your feedback',
  },
  {
    title: 'Implementation',
    description: 'We bring your design to life',
  },
]
