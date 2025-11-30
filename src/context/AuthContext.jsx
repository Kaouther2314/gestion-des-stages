import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulation de connexion - à remplacer par votre API
      let userData = null
      
      if (email === 'admin@stageapp.fr' && password === 'motdepasse') {
        userData = { id: 1, name: 'Administrateur', email, role: 'admin' }
      } else if (email === 'etudiant@stageapp.fr' && password === 'motdepasse') {
        userData = { id: 2, name: 'Étudiant Test', email, role: 'student' }
      } else if (email === 'hopital@stageapp.fr' && password === 'motdepasse') {
        userData = { id: 3, name: 'Hôpital Central', email, role: 'hospital' }
      } else {
        throw new Error('Identifiants incorrects')
      }

      const token = 'mock-jwt-token-' + Date.now()
      setUser(userData)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      return { user: userData, token }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}