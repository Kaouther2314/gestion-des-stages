import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

const HospitalDashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    activeServices: 0
  })

  useEffect(() => {
    // Simulation de données
    setStats({
      totalRequests: 45,
      pendingRequests: 12,
      acceptedRequests: 28,
      activeServices: 8
    })
  }, [])

  const recentRequests = [
    { 
      id: 1, 
      student: 'Marie Martin', 
      position: 'Interne médecine', 
      service: 'Médecine Interne',
      date: '2024-01-20', 
      status: 'En attente',
      university: 'Université d\'Alger'
    },
    { 
      id: 2, 
      student: 'Pierre Lambert', 
      position: 'Stage chirurgie', 
      service: 'Chirurgie Générale',
      date: '2024-01-19', 
      status: 'Accepté',
      university: 'Université de Blida'
    },
    { 
      id: 3, 
      student: 'Sophie Bernard', 
      position: 'Stage pédiatrie', 
      service: 'Pédiatrie',
      date: '2024-01-18', 
      status: 'En attente',
      university: 'Université d\'Oran'
    }
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
            <span style={styles.statLabel}>Candidatures reçues</span>
          </div>
          
          <div style={styles.statCard}>
            <h3>En attente</h3>
            <p style={{...styles.statNumber, color: '#f39c12'}}>{stats.pendingRequests}</p>
            <span style={styles.statLabel}>À traiter</span>
          </div>
          
          <div style={styles.statCard}>
            <h3>Acceptées</h3>
            <p style={{...styles.statNumber, color: '#27ae60'}}>{stats.acceptedRequests}</p>
            <span style={styles.statLabel}>Stages confirmés</span>
          </div>

          <div style={styles.statCard}>
            <h3>Services actifs</h3>
            <p style={styles.statNumber}>{stats.activeServices}</p>
            <span style={styles.statLabel}>Départements ouverts</span>
          </div>
        </div>

        <div style={styles.recentActivity}>
          <h3>Demandes Récentes</h3>
          <p style={styles.subtitle}>Examinez les candidatures et prenez vos décisions</p>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Étudiant</th>
                  <th style={styles.th}>Provenance</th>
                  <th style={styles.th}>Service</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map(request => (
                  <tr key={request.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <div>
                        <strong>{request.student}</strong>
                        <div style={styles.position}>{request.position}</div>
                      </div>
                    </td>
                    <td style={styles.td}>{request.university}</td>
                    <td style={styles.td}>{request.service}</td>
                    <td style={styles.td}>{request.date}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.status,
                        ...(request.status === 'Accepté' ? styles.statusAccepted : styles.statusPending)
                      }}>
                        {request.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={styles.viewButton}>Voir</button>
                        {request.status === 'En attente' && (
                          <>
                            <button style={styles.acceptButton}>Accepter</button>
                            <button style={styles.rejectButton}>Refuser</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{...styles.recentActivity, marginTop: '2rem'}}>
          <h3>Guide de l'établissement</h3>
          <div style={styles.instructionsContainer}>
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>1</div>
              <div>
                <h4 style={styles.instructionTitle}>Renseignements administratifs</h4>
                <p style={styles.instructionText}>Renseignez-vous auprès de l'administration universitaire pour les procédures de stage.</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>2</div>
              <div>
                <h4 style={styles.instructionTitle}>Gestion des offres de stages</h4>
                <p style={styles.instructionText}>Différenciez les offres de stages avec informations détaillées (initiale, description, durée, capacité d'accueil, service hospitalier).</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>3</div>
              <div>
                <h4 style={styles.instructionTitle}>Configuration des services</h4>
                <p style={styles.instructionText}>L'administration propose différents services (chirurgie, médecine interne, pédiatrie, gynécologie-obstétrique, etc.).</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>4</div>
              <div>
                <h4 style={styles.instructionTitle}>Examen des candidatures</h4>
                <p style={styles.instructionText}>Examinez l'origine de chaque candidature et prenez les décisions d'acceptation appropriées.</p>
              </div>
            </div>
            
            <div style={styles.instructionItem}>
              <div style={styles.instructionNumber}>5</div>
              <div>
                <h4 style={styles.instructionTitle}>Tableau de bord synthétique</h4>
                <p style={styles.instructionText}>Accédez au tableau de bord qui synthétise les données : activations de services, registre des stages, indicateurs clés.</p>
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
    borderBottom: '1px solid #dee2e6'
  },
  td: {
    padding: '1rem',
    color: '#212529'
  },
  position: {
    fontSize: '0.875rem',
    color: '#7f8c8d',
    marginTop: '0.25rem'
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
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
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

export default HospitalDashboard