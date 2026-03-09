import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
}

// Contact API
export const contactApi = {
  submit: async (formData: {
    name: string
    email: string
    phone?: string
    message: string
  }) => {
    const { data } = await api.post('/contact', formData)
    return data
  },
}
