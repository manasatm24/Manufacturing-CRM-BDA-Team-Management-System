import api from './api'

export const login = (data) => api.post('/auth/login', data)
export const register = (data) => api.post('/auth/register', data)
export const me = (token) => api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
