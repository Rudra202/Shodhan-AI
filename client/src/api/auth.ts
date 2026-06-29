import apiClient from './client';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  username?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authApi = {
  register: (data: RegisterData) => apiClient.post('/auth/register', data),

  login: (data: LoginData) => apiClient.post('/auth/login', data),

  refresh: (refreshToken: string) => apiClient.post('/auth/refresh', { refreshToken }),

  logout: () => apiClient.post('/auth/logout'),

  forgotPassword: (email: string) => apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password }),

  verifyEmail: (token: string) => apiClient.post('/auth/verify-email', { token }),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.post('/auth/change-password', { currentPassword, newPassword }),
};
