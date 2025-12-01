import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0
  })

  useEffect(() => {
    // Simulation de données
    setStats({
      totalApplications: 3,
      pendingApplications: 2,
      acceptedApplications: 1
    })
  }, [])

  const myApplications = [
    { 
      id: 1, 
      hospital: 'CHU Boumerdès', 
      service: 'Médecine Interne', 
      date: '15/03/2024', 
      status: 'En attente',
      evaluation: null
    },
    { 
      id: 2, 
      hospital: 'Hôpital Thenia', 
      service: 'Chirurgie', 
      date: '10/03/2024', 
      status: 'Acceptée',
      evaluation: '16/20'
    },
    { 
      id: 3, 
      hospital: 'Clinique Dellys', 
      service: 'Pédiatrie', 
      date: '12/03/2024', 
      status: 'En attente',
      evaluation: null
    }
  ]

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Tableau de Bord Étudiant</h1>
        
        <div style={styles.welcomeSection}>
          <h2>Bienvenue, Étudiant</h2>
          <p>Gérez vos candidatures de stage et consultez vos évaluations</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>Total candidatures</h3>
            <p style={styles.statNumber}>{stats.totalApplications}</p>
            <span style={styles.statLabel}>Candidatures soumises</span>
          </div>
          
          <div style={styles.statCard}>
            <h3>En attente</h3>
            <p style={styles.statNumber}>{stats.pendingApplications}</p>
            <span style={styles.statLabel}>Réponses attendues</span>
          </div>
          
          <div style={styles.statCard}>
            <h3>Acceptées</h3>
            <p style={styles.statNumber}>{stats.acceptedApplications}</p>
            <span style={styles.statLabel}>Stages confirmés</span>
          </div>
        </div>

        <div style={styles.recentActivity}>
          <h3>Mes candidatures</h3>
          <p style={styles.subtitle}>Consultez l'état de vos candidatures de stage</p>
          
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Établissement</th>
                  <th style={styles.th}>Service</th>
                  <th style={styles.th}>Date candidature</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Évaluation</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.map(app => (
                  <tr key={app.id} style={styles.tableRow}>
                    <td style={styles.td}><strong>{app.hospital}</strong></td>
                    <td style={styles.td}>{app.service}</td>
                    <td style={styles.td}>{app.date}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.status,
                        ...(app.status === 'Acceptée' ? styles.statusAccepted : styles.statusPending)
                      }}>
                        {app.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {app.evaluation ? (
                        <strong style={{ color: '#27ae60' }}>{app.evaluation}</strong>
                      ) : (
                        <span style={{ color: '#95a5a6' }}>-</span>
                      )}
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionButton}>
                        Voir détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{...styles.recentActivity, marginTop: '2rem'}}>
          <h3>Instructions pour les étudiants</h3>
          <div style={styles.instructionsContainer}>
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>1</div>
              <div>
                <h4 style={styles.instructionTitle}>Création de compte</h4>
                <p style={styles.instructionText}>Utilisez le compte créé par l'administration avec vos identifiants.</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>2</div>
              <div>
                <h4 style={styles.instructionTitle}>Compléter votre profil</h4>
                <p style={styles.instructionText}>Renseignez les informations nécessaires et téléchargez les documents requis (CV, relevés de notes, tests).</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>3</div>
              <div>
                <h4 style={styles.instructionTitle}>Rechercher des stages</h4>
                <p style={styles.instructionText}>Veuillez noter que les stages affichés ne correspondent pas nécessairement aux différents établissements.</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>4</div>
              <div>
                <h4 style={styles.instructionTitle}>Soumettre des candidatures</h4>
                <p style={styles.instructionText}>Soumettez des candidatures pour les stages qui vous intéressent.</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>5</div>
              <div>
                <h4 style={styles.instructionTitle}>Suivi en temps réel</h4>
                <p style={styles.instructionText}>Accédez au suivi en temps réel de vos candidatures et consultez les retours d'évaluation.</p>
              </div>
            </div>
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
  statusAccepted: {
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
  },
  instructionsContainer: {
    marginTop: '1.5rem'
  },
  instructionItem: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    alignItems: 'flex-start'
  },
  instructionNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    flexShrink: 0
  },
  instructionTitle: {
    margin: '0 0 0.5rem 0',
    color: '#2c3e50',
    fontSize: '1.1rem'
  },
  instructionText: {
    margin: 0,
    color: '#7f8c8d',
    lineHeight: '1.6'
  }
}

export default StudentDashboard