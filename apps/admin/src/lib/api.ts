import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      console.log('🔐 Admin Login: Attempting login for:', email)
      console.log('🔗 API URL:', API_URL)
      
      const response = await api.post('/auth/login', { email, password })
      console.log('✅ Login response:', response.data)
      
      const { data } = response
      
      if (data.accessToken) {
        console.log('💾 Storing token and user data')
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
      } else {
        console.warn('⚠️ No accessToken in response')
      }
      
      return data
    } catch (error: any) {
      console.error('❌ Login failed:', error)
      console.error('Error details:', error.response?.data)
      throw error
    }
  },
  logout: async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
}

// Analytics API
export const analyticsApi = {
  getDashboard: async () => {
    const { data } = await api.get('/analytics/dashboard')
    return data
  },
  getSocial: async () => {
    const { data } = await api.get('/analytics/social')
    return data
  },
}

// Projects API
export const projectsApi = {
  getAll: async () => {
    const { data } = await api.get('/projects')
    return data
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/projects/${id}`)
    return data
  },
  create: async (projectData: any) => {
    const { data } = await api.post('/projects', projectData)
    return data
  },
  update: async (id: string, projectData: any) => {
    const { data } = await api.patch(`/projects/${id}`, projectData)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/projects/${id}`)
    return data
  },
}

// Blog API
export const blogApi = {
  getAll: async () => {
    const { data } = await api.get('/blog')
    return data
  },
  getBySlug: async (slug: string) => {
    const { data } = await api.get(`/blog/${slug}`)
    return data
  },
  create: async (postData: any) => {
    const { data } = await api.post('/blog', postData)
    return data
  },
  update: async (id: string, postData: any) => {
    const { data } = await api.patch(`/blog/${id}`, postData)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/blog/${id}`)
    return data
  },
}

// Social Posts API
export const socialPostsApi = {
  getAll: async () => {
    const { data } = await api.get('/social-posts')
    return data
  },
  getScheduled: async () => {
    const { data } = await api.get('/social-posts/scheduled')
    return data
  },
  create: async (postData: any) => {
    const { data } = await api.post('/social-posts', postData)
    return data
  },
  update: async (id: string, postData: any) => {
    const { data } = await api.patch(`/social-posts/${id}`, postData)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/social-posts/${id}`)
    return data
  },
  publish: async (id: string) => {
    const { data } = await api.post(`/social-posts/${id}/publish`)
    return data
  },
}

// Users API
export const usersApi = {
  getAll: async () => {
    const { data } = await api.get('/users')
    return data
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/users/${id}`)
    return data
  },
  update: async (id: string, userData: any) => {
    const { data } = await api.patch(`/users/${id}`, userData)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/users/${id}`)
    return data
  },
}
