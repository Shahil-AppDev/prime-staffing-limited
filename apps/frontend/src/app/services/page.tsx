import { CheckCircle } from 'lucide-react'
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
              Comprehensive interior design solutions tailored to your unique needs and vision
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
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
    title: 'Residential Design',
    description: 'Transform your home into a beautiful and functional living space that reflects your personal style.',
    features: [
      'Complete home renovations',
      'Kitchen and bathroom design',
      'Living room and bedroom styling',
      'Custom furniture selection',
      'Color consultation',
      'Lighting design',
    ],
  },
  {
    title: 'Commercial Design',
    description: 'Create inspiring workspaces that enhance productivity and reflect your brand identity.',
    features: [
      'Office space planning',
      'Retail store design',
      'Restaurant and hospitality',
      'Corporate branding integration',
      'Ergonomic workspace solutions',
      'Sustainable design practices',
    ],
  },
  {
    title: 'Space Planning',
    description: 'Optimize your space for maximum functionality and flow with expert layout design.',
    features: [
      'Floor plan development',
      'Furniture arrangement',
      'Traffic flow optimization',
      'Storage solutions',
      'Multi-functional spaces',
      'Accessibility considerations',
    ],
  },
  {
    title: '3D Visualization',
    description: 'See your design come to life before implementation with photorealistic 3D renderings.',
    features: [
      'Photorealistic renderings',
      'Virtual walkthroughs',
      'Material and finish previews',
      'Multiple design options',
      'Lighting simulations',
      'Revision iterations',
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
