import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'

const Logout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await authAPI.logout()
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      } finally {
        logout()
      }
    }

    performLogout()
  }, [logout])

  return (
    <div style={styles.container}>
      <div style={styles.message}>
        <h2>Déconnexion en cours...</h2>
        <p>Merci d'avoir utilisé notre application.</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh'
  },
  message: {
    textAlign: 'center',
    color: '#666'
  }
}

export default Logout