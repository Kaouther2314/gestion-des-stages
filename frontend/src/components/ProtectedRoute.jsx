import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role && user?.role !== role) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Accès non autorisé</h2>
        <p>Vous n'avez pas les permissions nécessaires.</p>
      </div>
    )
  }

  return children
}

export default ProtectedRoute