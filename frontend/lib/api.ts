import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { User } from 'next-auth';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          window.location.href = '/';
        }
        return Promise.reject(error);
      },
    );
  }

  private async getAuthHeaders() {
    if (typeof window === 'undefined') return {};
    
    try {
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      
      if (session?.apiToken) {
        return { Authorization: `Bearer ${session.apiToken}` };
      }
    } catch (error) {
      console.error('Failed to get session:', error);
    }
    
    return {};
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const authHeaders = await this.getAuthHeaders();
    const response: AxiosResponse<T> = await this.client.get(url, {
      ...config,
      headers: { ...authHeaders, ...config?.headers },
    });
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const authHeaders = await this.getAuthHeaders();
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      {
        ...config,
        headers: { ...authHeaders, ...config?.headers },
      },
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const authHeaders = await this.getAuthHeaders();
    const response: AxiosResponse<T> = await this.client.put(url, data, {
      ...config,
      headers: { ...authHeaders, ...config?.headers },
    });
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const authHeaders = await this.getAuthHeaders();
    const response: AxiosResponse<T> = await this.client.delete(url, {
      ...config,
      headers: { ...authHeaders, ...config?.headers },
    });
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const authHeaders = await this.getAuthHeaders();
    const response: AxiosResponse<T> = await this.client.patch(
      url,
      data,
      {
        ...config,
        headers: { ...authHeaders, ...config?.headers },
      },
    );
    return response.data;
  }
}

export const api = new ApiClient();

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post<{ token: string; user: User }>('/auth/login', credentials),

  register: (data: { email: string; password: string; name?: string }) =>
    api.post<{ token: string; user: User }>('/auth/register', data),

  checkEmail: (email: string) =>
    api.post<{ exists: boolean; hasPassword: boolean }>('/auth/check-email', { email }),

  socialAuth: (data: {
    provider: string;
    providerId: string;
    email: string;
    name?: string;
    image?: string;
  }) => api.post<{ token: string; user: User }>('/auth/social', data),
};
