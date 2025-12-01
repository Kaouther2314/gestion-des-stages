import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

const HospitalDashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0
  })

  useEffect(() => {
    // Simulation de données
    setStats({
      totalRequests: 45,
      pendingRequests: 12,
      acceptedRequests: 28
    })
  }, [])

  const recentRequests = [
    { id: 1, student: 'Marie Martin', position: 'Interne médecine', date: '2024-01-20', status: 'En attente' },
    { id: 2, student: 'Pierre Lambert', position: 'Stage chirurgie', date: '2024-01-19', status: 'Accepté' },
    { id: 3, student: 'Sophie Bernard', position: 'Stage pédiatrie', date: '2024-01-18', status: 'En attente' }
  ]

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Tableau de Bord Hôpital</h1>
        
        <div style={styles.welcomeSection}>
          <h2>Bienvenue, Hôpital Central</h2>
          <p>Gérez les demandes de stage et les candidatures des étudiants</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>Total des demandes</h3>
            <p style={styles.statNumber}>{stats.totalRequests}</p>
          </div>
          
          <div style={styles.statCard}>
            <h3>En attente</h3>
            <p style={styles.statNumber}>{stats.pendingRequests}</p>
          </div>
          
          <div style={styles.statCard}>
            <h3>Acceptées</h3>
            <p style={styles.statNumber}>{stats.acceptedRequests}</p>
          </div>
        </div>

        <div style={styles.recentActivity}>
          <h3>Demandes Récentes</h3>
          <div style={styles.requestsList}>
            {recentRequests.map(request => (
              <div key={request.id} style={styles.requestCard}>
                <div style={styles.requestInfo}>
                  <h4>{request.student}</h4>
                  <p>{request.position}</p>
                  <span style={styles.date}>{request.date}</span>
                </div>
                <div style={styles.requestActions}>
                  <span style={{
                    ...styles.status,
                    ...(request.status === 'Accepté' ? styles.statusAccepted : styles.statusPending)
                  }}>
                    {request.status}
                  </span>
                  <button style={styles.viewButton}>Voir</button>
                </div>
              </div>
            ))}
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
  welcomeSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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

export default HospitalDashboard