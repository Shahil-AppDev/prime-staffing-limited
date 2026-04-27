'use client'

import { blogApi } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Calendar, User } from 'lucide-react'
import Link from 'next/link'

const MOCK_POSTS = [
  {
    id: '1',
    slug: 'top-hiring-trends-2024',
    title: 'Top Hiring Trends to Watch in 2024',
    excerpt: 'Discover the latest trends shaping the recruitment landscape and how to stay ahead in talent acquisition.',
    publishedAt: '2024-03-15',
    author: { firstName: 'Sarah', lastName: 'Johnson' }
  },
  {
    id: '2',
    slug: 'remote-work-recruitment',
    title: 'Recruiting for Remote Positions: Best Practices',
    excerpt: 'Learn effective strategies for finding and hiring top remote talent in today\'s distributed workforce.',
    publishedAt: '2024-03-10',
    author: { firstName: 'Michael', lastName: 'Chen' }
  },
  {
    id: '3',
    slug: 'candidate-experience-matters',
    title: 'Why Candidate Experience Matters More Than Ever',
    excerpt: 'Explore how improving candidate experience can boost your employer brand and attract better talent.',
    publishedAt: '2024-03-05',
    author: { firstName: 'Emma', lastName: 'Williams' }
  },
  {
    id: '4',
    slug: 'ai-recruitment-tools',
    title: 'AI-Powered Recruitment: Tools and Strategies',
    excerpt: 'How artificial intelligence is transforming the recruitment process and improving hiring outcomes.',
    publishedAt: '2024-02-28',
    author: { firstName: 'Sarah', lastName: 'Johnson' }
  },
  {
    id: '5',
    slug: 'executive-search-guide',
    title: 'Executive Search: A Complete Guide',
    excerpt: 'Everything you need to know about finding and hiring C-level executives for your organization.',
    publishedAt: '2024-02-20',
    author: { firstName: 'Michael', lastName: 'Chen' }
  },
  {
    id: '6',
    slug: 'diversity-hiring',
    title: 'Building Diverse Teams: Recruitment Strategies',
    excerpt: 'Practical approaches to creating more diverse and inclusive hiring processes.',
    publishedAt: '2024-02-15',
    author: { firstName: 'Emma', lastName: 'Williams' }
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="text-gray-600 mt-4">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts?.map((post: any) => (
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
