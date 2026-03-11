import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me');

// Reservations
export const createReservation = (data) => api.post('/reservations', data);
export const getReservations = () => api.get('/reservations');
export const getReservation = (id) => api.get(`/reservations/${id}`);
export const updateReservation = (id, data) => api.patch(`/reservations/${id}`, data);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);
export const checkAvailability = (date, time) => api.get('/reservations/availability', { params: { date, time } });

// Menu
export const getMenu = (category) => api.get('/menu', category ? { params: { category } } : {});
export const getMenuByCategory = (cat) => api.get(`/menu/${encodeURIComponent(cat)}`);
export const createMenuItem = (data) => api.post('/menu', data);
export const updateMenuItem = (id, data) => api.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);

// Events
export const createEventInquiry = (data) => api.post('/events', data);
export const getEventInquiries = () => api.get('/events');
export const updateEventInquiry = (id, data) => api.patch(`/events/${id}`, data);

// Contact
export const createContact = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');

// Blog
export const getBlogPosts = () => api.get('/blog');
export const getBlogPost = (slug) => api.get(`/blog/${slug}`);
export const createBlogPost = (data) => api.post('/blog', data);
export const updateBlogPost = (id, data) => api.put(`/blog/${id}`, data);
export const deleteBlogPost = (id) => api.delete(`/blog/${id}`);

export default api;
