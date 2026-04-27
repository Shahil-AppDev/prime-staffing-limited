'use client'

import { analyticsApi } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import {
  Calendar,
  FileText,
  FolderKanban,
  Share2,
  Users
} from 'lucide-react'

export default function DashboardPage() {
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: analyticsApi.getDashboard,
    retry: 1,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    console.error('Dashboard error:', error)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load dashboard data</p>
          <p className="text-gray-500 text-sm">Using default values</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Total Projects',
      value: analytics?.totalProjects || 0,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Clients',
      value: analytics?.totalClients || 0,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Blog Posts',
      value: analytics?.totalPosts || 0,
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      name: 'Social Posts',
      value: analytics?.totalSocialPosts || 0,
      icon: Share2,
      color: 'bg-pink-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New project created</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Blog post published</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Share2 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Social post scheduled</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Projects</span>
              <span className="text-sm font-semibold text-gray-900">{analytics?.activeProjects || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Leads</span>
              <span className="text-sm font-semibold text-gray-900">{analytics?.totalLeads || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Scheduled Posts</span>
              <span className="text-sm font-semibold text-gray-900">{analytics?.scheduledPosts || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Users</span>
              <span className="text-sm font-semibold text-gray-900">{analytics?.totalUsers || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
