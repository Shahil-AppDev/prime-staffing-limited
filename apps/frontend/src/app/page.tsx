'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb, Palette, Shield, Snowflake, Sparkles, Star, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section - Ultra Modern 2026 */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-gray-700">Staffing Innovation 2026</span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
                <span className="gradient-text text-shadow-lg">
                  Transform
                </span>
                <br />
                <span className="text-gray-900">Your Workforce</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of staffing with AI-powered talent matching,
                comprehensive recruitment solutions, and cutting-edge workforce management.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary group">
                  <span>Start Your Journey</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/portfolio" className="btn-glass group">
                  <span>Explore Portfolio</span>
                  <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12"
              >
                {[
                  { value: '500+', label: 'Projects' },
                  { value: '98%', label: 'Satisfaction' },
                  { value: '50+', label: 'Awards' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative glass-card p-8 float-animation">
                <div className="aspect-square bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800')] bg-cover bg-center opacity-80" />
                </div>

                {/* Floating Cards */}
                <motion.div
                  className="absolute -top-6 -right-6 glass-card p-4 shadow-glow"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">AI Powered</div>
                      <div className="text-xs text-gray-600">Smart Matching</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 glass-card p-4 shadow-glow"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Instant Hire</div>
                      <div className="text-xs text-gray-600">Real-time</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Modern Glass Cards */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-primary-50/30" />

        <div className="container-custom relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              Why Choose Prime Staffing
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">Innovation</span> Meets Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology combined with proven recruitment strategies
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="glass-card p-8 h-full">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <feature.icon className="h-8 w-8 text-primary-600 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive interior design solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Let's discuss your project and bring your vision to life
          </p>
          <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Matching',
    description: 'Leverage artificial intelligence to match the perfect candidates with your job requirements instantly',
  },
  {
    icon: Palette,
    title: 'Comprehensive Screening',
    description: 'Thorough background checks, skill assessments, and interview processes for quality candidates',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Pre-vetted professionals, compliance assurance, and meticulous attention to every placement',
  },
  {
    icon: Lightbulb,
    title: 'Smart Solutions',
    description: 'Innovative staffing strategies that blend flexibility with long-term workforce planning',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Workforce',
    description: 'Staffing solutions that adapt to your business growth and seasonal demands',
  },
  {
    icon: Sparkles,
    title: 'Personalized Service',
    description: 'Every placement is uniquely tailored to match your company culture and specific needs',
  },
]

const divisions = [
  {
    title: 'Prime Staffing',
    description: 'Professional recruitment, staffing and workforce solutions for businesses.',
    icon: <Users />,
    iconBg: 'from-primary-500 to-primary-600',
    gradientFrom: 'from-primary-500',
    gradientTo: 'to-primary-600',
    link: '/services',
    isNew: false
  },
  {
    title: 'Prime Precision Cooling',
    description: 'Specialized air conditioning, refrigeration, HVAC installation, maintenance and precision cooling solutions for residential, commercial and industrial clients.',
    icon: <Snowflake />,
    iconBg: 'from-blue-500 to-cyan-500',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    link: '/services/cooling',
    isNew: true
  },
  {
    title: 'Prime Electrical Services',
    description: 'Electrical installation, maintenance, repair and compliance solutions.',
    icon: <Zap />,
    iconBg: 'from-yellow-500 to-orange-500',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-500',
    link: '/services/electrical',
    isNew: false
  },
  {
    title: 'Prime Plumbing Services',
    description: 'Plumbing installation, repairs, water systems and maintenance solutions.',
    icon: <Wrench />,
    iconBg: 'from-teal-500 to-blue-600',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-blue-600',
    link: '/services/plumbing',
    isNew: false
  },
  {
    title: 'Prime Staffing',
    description: 'Professional recruitment, staffing and workforce solutions for businesses.',
    icon: <Users />,
    iconBg: 'from-primary-500 to-primary-600',
    gradientFrom: 'from-primary-500',
    gradientTo: 'to-primary-600',
    link: '/services',
    isNew: false
  },
  {
    title: 'Prime Electrical Services',
    description: 'Electrical installation, maintenance, repair and compliance solutions.',
    icon: <Zap />,
    iconBg: 'from-yellow-500 to-orange-500',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-500',
    link: '/services/electrical',
    isNew: false
  },
  {
    title: 'Prime Plumbing Services',
    description: 'Plumbing installation, repairs, water systems and maintenance solutions.',
    icon: <Wrench />,
    iconBg: 'from-teal-500 to-blue-600',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-blue-600',
    link: '/services/plumbing',
    isNew: false
  },
]

const services = [
  {
    title: 'Temporary Staffing',
    description: 'Flexible workforce solutions for short-term projects and seasonal demands',
  },
  {
    title: 'Permanent Placement',
    description: 'Find the perfect long-term employees to grow your business',
  },
  {
    title: 'Executive Search',
    description: 'Specialized recruitment for senior leadership and executive positions',
  },
  {
    title: 'Contract Staffing',
    description: 'Skilled professionals for project-based and contract work',
  },
]

const testimonials = [
  {
    text: 'Prime Staffing Ltd found us the perfect candidates in record time. Their AI matching system is incredibly accurate.',
    name: 'Sarah Johnson',
    role: 'HR Director',
  },
  {
    text: 'Professional, efficient, and a pleasure to work with. They helped us scale our team during our busiest season.',
    name: 'Michael Chen',
    role: 'Business Owner',
  },
  {
    text: 'From initial consultation to placement, the team was exceptional. Our new hires are outstanding!',
    name: 'Emma Williams',
    role: 'Operations Manager',
  },
]


