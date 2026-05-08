'use client'

import { projectsApi } from '@/lib/api'
import { getPlaceholder } from '@/lib/placeholders'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const PRIME_GROUP_PROJECTS = [
  {
    id: '1',
    title: 'Luxury Office Interior Renovation',
    description: 'Complete interior transformation of a 5000 sq ft corporate office in Port Louis with modern design, custom carpentry and premium finishes',
    category: 'Interior',
    status: 'COMPLETED',
    createdAt: '2024-01-15',
    company: 'Prime Concept Decor'
  },
  {
    id: '2',
    title: 'Commercial HVAC Installation Project',
    description: 'Full air conditioning system installation for a 3-story commercial building including electrical upgrades and maintenance contract',
    category: 'HVAC',
    status: 'COMPLETED',
    createdAt: '2024-02-20',
    company: 'Prime Precision Cooling'
  },
  {
    id: '3',
    title: 'Industrial Logistics Support Contract',
    description: 'Ongoing transportation and logistics services for manufacturing facility, handling equipment and goods delivery across Mauritius',
    category: 'Logistics',
    status: 'COMPLETED',
    createdAt: '2024-03-10',
    company: 'Prime Mechanical Equipment'
  },
  {
    id: '4',
    title: 'Residential Solar Energy Installation',
    description: 'Complete solar panel system installation for residential complex with battery storage and grid integration',
    category: 'Solar',
    status: 'COMPLETED',
    createdAt: '2023-11-01',
    company: 'Prime Green Technology'
  },
  {
    id: '5',
    title: 'Hotel Custom Blinds Fitting',
    description: 'Design, manufacture and installation of custom blinds for 50-room boutique hotel in Grand Baie',
    category: 'Blinds',
    status: 'COMPLETED',
    createdAt: '2024-01-05',
    company: 'Prime Blind'
  },
  {
    id: '6',
    title: 'Medical Supply Distribution Partnership',
    description: 'Established distribution network for medical equipment and supplies to 15 clinics and pharmacies across the island',
    category: 'Medical',
    status: 'COMPLETED',
    createdAt: '2023-12-15',
    company: 'Prime Health Care'
  },
  {
    id: '7',
    title: 'Restaurant Exterior Renovation',
    description: 'Complete exterior makeover including aluminium works, facade design and outdoor seating area construction',
    category: 'Decoration',
    status: 'COMPLETED',
    createdAt: '2024-02-28',
    company: 'Prime Concept Decor'
  },
  {
    id: '8',
    title: 'Industrial Cooling System Upgrade',
    description: 'Refrigeration system upgrade for food processing facility with 24/7 maintenance support',
    category: 'Cooling',
    status: 'COMPLETED',
    createdAt: '2024-03-15',
    company: 'Prime Precision Cooling'
  },
  {
    id: '9',
    title: 'Wind Turbine Installation Project',
    description: 'Installation of small-scale wind turbine system for agricultural facility with renewable energy integration',
    category: 'Renewable',
    status: 'COMPLETED',
    createdAt: '2024-01-20',
    company: 'Prime Green Technology'
  }
]

export default function PortfolioPage() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  })

  const displayProjects = error ? PRIME_GROUP_PROJECTS : (projects || PRIME_GROUP_PROJECTS)

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200">
              Explore successful projects delivered by Prime Group Ltd sister companies across Mauritius
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects?.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.id}`}
                  className="card group overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <img
                      src={getPlaceholder(project.category)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {project.company || 'Prime Group Ltd'}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                        {project.category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
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

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Contact Prime Group Ltd to discuss your requirements with our specialized teams
          </p>
          <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
