import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    toEvaluate: 0,
    evaluations: 0,
    activeInterns: 0
  })

  useEffect(() => {
    // Simulation de données
    setStats({
      toEvaluate: 5,
      evaluations: 23,
      activeInterns: 8
    })
  }, [])

  const applications = [
    { id: 1, student: 'Amina Benali', matricule: '201900123', period: 'Mars - Avril 2024', status: 'En cours' },
    { id: 2, student: 'Karim Mansouri', matricule: '201900456', period: 'Mars - Avril 2024', status: 'En cours' },
    { id: 3, student: 'Sarah Belkacem', matricule: '201900789', period: 'Février - Mars 2024', status: 'Terminé' }
  ]

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Tableau de Bord Médecin</h1>
        
        <div style={styles.welcomeSection}>
          <h2>Espace Médecin - Chef de Service</h2>
          <p>Gérez les candidatures et évaluez les stagiaires de votre service</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>À évaluer</h3>
            <p style={styles.statNumber}>{stats.toEvaluate}</p>
            <span style={styles.statLabel}>Étudiants en attente</span>
          </div>
          
          <div style={styles.statCard}>
            <h3>Évaluations</h3>
            <p style={styles.statNumber}>{stats.evaluations}</p>
            <span style={styles.statLabel}>Ce semestre</span>
          </div>
          
          <div style={styles.statCard}>
            <h3>Stagiaires actifs</h3>
            <p style={styles.statNumber}>{stats.activeInterns}</p>
            <span style={styles.statLabel}>Dans votre service</span>
          </div>
        </div>

        <div style={styles.recentActivity}>
          <h3>Candidatures pour votre service</h3>
          <p style={styles.subtitle}>Examinez et évaluez les candidats</p>
          
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Étudiant</th>
                  <th style={styles.th}>Matricule</th>
                  <th style={styles.th}>Période</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} style={styles.tableRow}>
                    <td style={styles.td}>{app.student}</td>
                    <td style={styles.td}>{app.matricule}</td>
                    <td style={styles.td}>{app.period}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.status,
                        ...(app.status === 'Terminé' ? styles.statusCompleted : styles.statusPending)
                      }}>
                        {app.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionButton}>
                        {app.status === 'Terminé' ? 'Voir évaluation' : 'Évaluer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    margin: '0.5rem 0'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#666'
  },
  recentActivity: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  subtitle: {
    color: '#666',
    marginTop: '0.25rem',
    marginBottom: '1.5rem'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6'
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#495057',
    fontSize: '0.875rem',
    textTransform: 'uppercase'
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
    transition: 'background-color 0.2s'
  },
  td: {
    padding: '1rem',
    color: '#212529'
  },
  status: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  actionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  }
}

export default DoctorDashboard