import { getPortfolioProjectById, getRelatedProjects, getAllPortfolioProjects } from '@/lib/portfolio-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Building2, CheckCircle, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const projects = getAllPortfolioProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = getPortfolioProjectById(params.id)
  
  if (!project) {
    return {
      title: 'Project Not Found | Prime Group Ltd',
    }
  }

  return {
    title: `${project.title} | Prime Group Ltd Portfolio`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Prime Group Ltd`,
      description: project.shortDescription,
      type: 'article',
    },
  }
}

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const project = getPortfolioProjectById(params.id)

  if (!project) {
    notFound()
  }

  const relatedProjects = getRelatedProjects(project.id, 3)

  return (
    <div>
      {/* Back Navigation */}
      <section className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
        <div className="container-custom py-4">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-semibold mb-4">
                {project.company}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
                {project.shortDescription}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-200">Location</p>
                    <p className="font-semibold">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-200">Year</p>
                    <p className="font-semibold">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-200">Category</p>
                    <p className="font-semibold">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-200">Duration</p>
                    <p className="font-semibold">{project.duration}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Project Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Services Delivered */}
      <section className="section-padding bg-gray-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-8">
              Services Delivered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
                >
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-8">
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="card p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Result */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Project Result
            </h2>
            <div className="card p-8 bg-white dark:bg-slate-900">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-white dark:bg-slate-950">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.id}`}
                  className="card group overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {relatedProject.company}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedProject.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Discuss a Similar Project
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Interested in a project like this? Contact our team to discuss your requirements
          </p>
          <Link 
            href={`/contact?project=${project.id}`}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
