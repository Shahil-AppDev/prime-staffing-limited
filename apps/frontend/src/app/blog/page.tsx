'use client'

import { useQuery } from '@tanstack/react-query'
import { blogApi } from '@/lib/api'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Calendar, User } from 'lucide-react'

export default function BlogPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: blogApi.getAll,
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600">
              Design inspiration, tips, and insights from our team
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post: any) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="card group"
                >
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <p className="text-gray-500">Featured Image</p>
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
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
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
    </div>
  )
}
