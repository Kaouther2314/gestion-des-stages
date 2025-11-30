import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout')
}

export const adminAPI = {
  getStudents: () => api.get('/admin/students'),
  createStudent: (data) => api.post('/admin/students', data),
  getHospitals: () => api.get('/admin/hospitals'),
  createHospital: (data) => api.post('/admin/hospitals', data)
}

export const studentAPI = {
  getDashboard: () => api.get('/student/dashboard'),
  getInternships: () => api.get('/student/internships'),
  updateProfile: (data) => api.put('/student/profile', data)
}

export const hospitalAPI = {
  getDashboard: () => api.get('/hospital/dashboard'),
  getRequests: () => api.get('/hospital/requests'),
  updateProfile: (data) => api.put('/hospital/profile', data)
}

export default api