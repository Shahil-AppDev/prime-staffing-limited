'use client'

import { useQuery } from '@tanstack/react-query'
import { projectsApi } from '@/lib/api'
import Link from 'next/link'

export default function PortfolioPage() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-600">
              Explore our collection of stunning interior design projects
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project: any) => (
                <Link 
                  key={project.id} 
                  href={`/portfolio/${project.id}`}
                  className="card group"
                >
                  <div className="bg-gray-200 h-64 flex items-center justify-center">
                    <p className="text-gray-500">Project Image</p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-600 font-medium">
                        {project.category}
                      </span>
                      <span className="text-gray-500">
                        {new Date(project.completedAt).getFullYear()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
