import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiResponse, UsersResponse, User, CreateUserData, UpdateUserData } from '../types'

class APIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY || 'demo-api-key'}`,
      },
      timeout: 10000,
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
        return config
      },
      (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        console.error('Response error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get(endpoint, { params })
    return response.data
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post(endpoint, data)
    return response.data
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.put(endpoint, data)
    return response.data
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.client.delete(endpoint)
    return response.data
  }
}

export const apiClient = new APIClient()

// Users API service
export class UsersService {
  private static readonly BASE_ENDPOINT = '/users'

  static async getUsers(params?: {
    page?: number
    limit?: number
    search?: string
    role?: string
    status?: string
  }): Promise<ApiResponse<UsersResponse>> {
    return apiClient.get<ApiResponse<UsersResponse>>(this.BASE_ENDPOINT, params)
  }

  static async getUserById(id: string): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>(`${this.BASE_ENDPOINT}/${id}`)
  }

  static async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    return apiClient.post<ApiResponse<User>>(this.BASE_ENDPOINT, userData)
  }

  static async updateUser(id: string, userData: UpdateUserData): Promise<ApiResponse<User>> {
    return apiClient.put<ApiResponse<User>>(`${this.BASE_ENDPOINT}/${id}`, userData)
  }

  static async deleteUser(id: string): Promise<ApiResponse<{ id: string; deleted_at: string }>> {
    return apiClient.delete<ApiResponse<{ id: string; deleted_at: string }>>(`${this.BASE_ENDPOINT}/${id}`)
  }
}

// Health check service
export class HealthService {
  static async checkHealth(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return apiClient.get<ApiResponse<{ status: string; timestamp: string }>>('/health')
  }
}