import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { adminAPI } from '../../services/api'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalHospitals: 0,
    pendingRequests: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Simulation de données
      setStats({
        totalStudents: 150,
        totalHospitals: 25,
        pendingRequests: 12
      })
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Tableau de Bord Administrateur</h1>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>Étudiants</h3>
            <p style={styles.statNumber}>{stats.totalStudents}</p>
          </div>
          
          <div style={styles.statCard}>
            <h3>Hôpitaux</h3>
            <p style={styles.statNumber}>{stats.totalHospitals}</p>
          </div>
          
          <div style={styles.statCard}>
            <h3>Demandes en attente</h3>
            <p style={styles.statNumber}>{stats.pendingRequests}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh'
  },
  content: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#f8f9fa'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '0.5rem 0 0 0'
  },
  recentActivity: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  requestsList: {
    marginTop: '1rem'
  },
  requestCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '0.5rem'
  },
  requestInfo: {
    flex: 1
  },
  requestActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  status: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  },
  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  statusAccepted: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  date: {
    color: '#666',
    fontSize: '0.875rem'
  }
}

export default AdminDashboard