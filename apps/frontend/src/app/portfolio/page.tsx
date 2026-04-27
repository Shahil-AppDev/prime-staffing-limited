'use client'

import { projectsApi } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Tech Startup - Engineering Team',
    description: 'Successfully placed 15 senior engineers for a fast-growing SaaS company',
    category: 'Technology',
    status: 'COMPLETED',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Healthcare Provider - Nursing Staff',
    description: 'Recruited 50+ qualified nurses for a major hospital network',
    category: 'Healthcare',
    status: 'COMPLETED',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    title: 'Financial Services - Executive Search',
    description: 'Placed CFO and VP of Finance for a leading investment firm',
    category: 'Finance',
    status: 'COMPLETED',
    createdAt: '2024-03-10'
  },
  {
    id: '4',
    title: 'Retail Chain - Seasonal Staffing',
    description: 'Provided 200+ temporary staff for holiday season',
    category: 'Retail',
    status: 'COMPLETED',
    createdAt: '2023-11-01'
  },
  {
    id: '5',
    title: 'Manufacturing - Production Team',
    description: 'Recruited skilled production workers for new facility',
    category: 'Manufacturing',
    status: 'COMPLETED',
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    title: 'Education - Administrative Staff',
    description: 'Placed administrators and support staff for university',
    category: 'Education',
    status: 'COMPLETED',
    createdAt: '2023-12-15'
  }
]

export default function PortfolioPage() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  })

  const displayProjects = error ? MOCK_PROJECTS : (projects || MOCK_PROJECTS)

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Success <span className="gradient-text">Stories</span>
            </h1>
            <p className="text-xl text-gray-600">
              Explore our recent placements and recruitment success stories
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="text-gray-600 mt-4">Loading success stories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects?.map((project: any) => (
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
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-600 font-medium">
                        {project.category}
                      </span>
                      <span className="text-gray-500">
                        {new Date(project.createdAt).getFullYear()}
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
