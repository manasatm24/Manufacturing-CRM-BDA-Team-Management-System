import api from './api'

export const getLeads = (token, params) => api.get('/leads', { headers: { Authorization: `Bearer ${token}` }, params })
export const createLead = (token, data) => api.post('/leads', data, { headers: { Authorization: `Bearer ${token}` } })
export const updateLead = (token, id, data) => api.put(`/leads/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
export const deleteLead = (token, id) => api.delete(`/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } })
