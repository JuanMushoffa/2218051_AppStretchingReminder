import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://683b2ad443bb370a8674ea8c.mockapi.io/api',
});

// Opsional: fungsikan langsung
export const getStretches = () => api.get('/stretch');
export const postStretch = (data) => api.post('/stretch', data);
export const updateStretch = (id, data) => api.put(`/stretch/${id}`, data);
export const deleteStretch = (id) => api.delete(`/stretch/${id}`);
