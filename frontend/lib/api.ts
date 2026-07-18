import axios, { AxiosInstance, AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface DecodedToken {
  user_id: number
  email: string
  exp: number
}

class APIClient {
  private client: AxiosInstance
  private token: string | null = null

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
    }

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`
      }
      return config
    })

    // Handle token expiry
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.clearToken()
        }
        return Promise.reject(error)
      }
    )
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  getToken(): string | null {
    return this.token
  }

  isTokenValid(): boolean {
    if (!this.token) return false
    try {
      const decoded = jwtDecode<DecodedToken>(this.token)
      return decoded.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  async get(endpoint: string, params?: Record<string, any>) {
    return this.client.get(endpoint, { params })
  }

  async post(endpoint: string, data?: Record<string, any>) {
    return this.client.post(endpoint, data)
  }

  async put(endpoint: string, data?: Record<string, any>) {
    return this.client.put(endpoint, data)
  }

  async delete(endpoint: string) {
    return this.client.delete(endpoint)
  }
}

export const apiClient = new APIClient()

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    apiClient.post('/auth/register', { email, password, name }),
  verify: () => apiClient.get('/auth/verify'),
}

// Services API
export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  getBySlug: (slug: string) => apiClient.get(`/services/${slug}`),
  create: (data: Record<string, any>) => apiClient.post('/services', data),
  update: (id: number, data: Record<string, any>) =>
    apiClient.put(`/services/${id}`, data),
  delete: (id: number) => apiClient.delete(`/services/${id}`),
}

// Projects API
export const projectsAPI = {
  getAll: (filters?: { category?: string; featured?: boolean }) =>
    apiClient.get('/projects', filters),
  getBySlug: (slug: string) => apiClient.get(`/projects/${slug}`),
  create: (data: Record<string, any>) => apiClient.post('/projects', data),
  update: (id: number, data: Record<string, any>) =>
    apiClient.put(`/projects/${id}`, data),
  delete: (id: number) => apiClient.delete(`/projects/${id}`),
  addImage: (projectId: number, data: Record<string, any>) =>
    apiClient.post(`/projects/${projectId}/images`, data),
}

// Blog API
export const blogAPI = {
  getAll: () => apiClient.get('/blog'),
  getBySlug: (slug: string) => apiClient.get(`/blog/${slug}`),
  create: (data: Record<string, any>) => apiClient.post('/blog', data),
  update: (id: number, data: Record<string, any>) =>
    apiClient.put(`/blog/${id}`, data),
  delete: (id: number) => apiClient.delete(`/blog/${id}`),
}

// Jobs API
export const jobsAPI = {
  getAll: () => apiClient.get('/jobs'),
  getBySlug: (slug: string) => apiClient.get(`/jobs/${slug}`),
  create: (data: Record<string, any>) => apiClient.post('/jobs', data),
  update: (id: number, data: Record<string, any>) =>
    apiClient.put(`/jobs/${id}`, data),
  delete: (id: number) => apiClient.delete(`/jobs/${id}`),
}

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials'),
  create: (data: Record<string, any>) => apiClient.post('/testimonials', data),
  update: (id: number, data: Record<string, any>) =>
    apiClient.put(`/testimonials/${id}`, data),
  delete: (id: number) => apiClient.delete(`/testimonials/${id}`),
}

// Contact API
export const contactAPI = {
  submit: (data: Record<string, any>) => apiClient.post('/contact/submit', data),
  getSubmissions: () => apiClient.get('/contact/submissions'),
  getSubmission: (id: number) => apiClient.get(`/contact/submissions/${id}`),
  deleteSubmission: (id: number) => apiClient.delete(`/contact/submissions/${id}`),
}
