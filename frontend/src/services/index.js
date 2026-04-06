import apiClient from './apiClient';

// Auth APIs
export const authAPI = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
};

// Ticket APIs
export const ticketAPI = {
  createTicket: (ticketData) => apiClient.post('/tickets', ticketData),
  getAllTickets: (params) => apiClient.get('/tickets', { params }),
  getTicketById: (id) => apiClient.get(`/tickets/${id}`),
  updateTicket: (id, ticketData) => apiClient.put(`/tickets/${id}`, ticketData),
  deleteTicket: (id) => apiClient.delete(`/tickets/${id}`),
  getMyTickets: () => apiClient.get('/tickets/my-tickets'),
};

// Ticket Update APIs
export const ticketUpdateAPI = {
  addUpdate: (ticketId, updateData) => apiClient.post(`/ticket-updates/${ticketId}`, updateData),
  getUpdates: (ticketId) => apiClient.get(`/ticket-updates/${ticketId}`),
};

export default {
  authAPI,
  ticketAPI,
  ticketUpdateAPI,
};
