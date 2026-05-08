'use client'

import { blogApi } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Calendar, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const MOCK_POSTS = [
  {
    id: '1',
    slug: 'prime-group-expansion-2024',
    title: 'Prime Group Ltd Expands Services Across Mauritius',
    excerpt: 'Discover how Prime Group Ltd is growing its presence across six specialized sectors to better serve businesses and communities.',
    publishedAt: '2024-03-15',
    author: { firstName: 'Prime', lastName: 'Group' }
  },
  {
    id: '2',
    slug: 'renewable-energy-mauritius',
    title: 'The Future of Renewable Energy in Mauritius',
    excerpt: 'Learn about solar and wind energy solutions transforming how businesses and homes power their operations sustainably.',
    publishedAt: '2024-03-10',
    author: { firstName: 'Green', lastName: 'Technology' }
  },
  {
    id: '3',
    slug: 'interior-design-trends',
    title: 'Modern Interior Design Trends for Commercial Spaces',
    excerpt: 'Explore the latest trends in office and commercial interior decoration that combine functionality with aesthetic appeal.',
    publishedAt: '2024-03-05',
    author: { firstName: 'Concept', lastName: 'Decor' }
  },
  {
    id: '4',
    slug: 'hvac-maintenance-guide',
    title: 'Essential HVAC Maintenance for Mauritian Climate',
    excerpt: 'How proper air conditioning maintenance can reduce energy costs and extend system lifespan in tropical conditions.',
    publishedAt: '2024-02-28',
    author: { firstName: 'Precision', lastName: 'Cooling' }
  },
  {
    id: '5',
    slug: 'logistics-efficiency',
    title: 'Optimizing Logistics and Transportation Services',
    excerpt: 'Best practices for efficient goods transportation and equipment logistics across Mauritius.',
    publishedAt: '2024-02-20',
    author: { firstName: 'Mechanical', lastName: 'Equipment' }
  },
  {
    id: '6',
    slug: 'custom-blinds-selection',
    title: 'Choosing the Right Blinds for Your Space',
    excerpt: 'A comprehensive guide to selecting and installing custom blinds for residential and commercial properties.',
    publishedAt: '2024-02-15',
    author: { firstName: 'Prime', lastName: 'Blind' }
  }
]

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog'],
    queryFn: blogApi.getAll,
  })

  const displayPosts = error ? MOCK_POSTS : (posts || MOCK_POSTS)

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Insights & Articles
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Expert insights, industry trends and practical advice from Prime Group Ltd
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts?.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card group overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/placeholders/blog-default.svg"
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author.firstName} {post.author.lastName}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
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
            Stay Updated
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Subscribe to receive the latest insights and updates from Prime Group Ltd
          </p>
          <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
