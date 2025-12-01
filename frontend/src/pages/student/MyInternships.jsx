import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'

const MyInternships = () => {
  const [internships, setInternships] = useState([
    { 
      id: 1, 
      hospital: 'Hôpital Central', 
      position: 'Interne en médecine', 
      status: 'En attente', 
      date: '2024-01-15',
      department: 'Médecine Générale'
    },
    { 
      id: 2, 
      hospital: 'Clinique Saint-Louis', 
      position: 'Stage en chirurgie', 
      status: 'Accepté', 
      date: '2024-01-10',
      department: 'Chirurgie'
    },
    { 
      id: 3, 
      hospital: 'Hôpital Universitaire', 
      position: 'Stage en pédiatrie', 
      status: 'Refusé', 
      date: '2024-01-05',
      department: 'Pédiatrie'
    }
  ])

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Accepté':
        return styles.statusAccepted
      case 'En attente':
        return styles.statusPending
      case 'Refusé':
        return styles.statusRejected
      default:
        return styles.statusDefault
    }
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.header}>
          <h1>Mes Demandes de Stage</h1>
          <button style={styles.newRequestButton}>+ Nouvelle Demande</button>
        </div>
        
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Hôpital</th>
                <th>Poste</th>
                <th>Département</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map(internship => (
                <tr key={internship.id}>
                  <td>{internship.hospital}</td>
                  <td>{internship.position}</td>
                  <td>{internship.department}</td>
                  <td>
                    <span style={{...styles.status, ...getStatusStyle(internship.status)}}>
                      {internship.status}
                    </span>
                  </td>
                  <td>{internship.date}</td>
                  <td>
                    <button style={styles.viewButton}>Voir</button>
                    <button style={styles.cancelButton}>Annuler</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {internships.length === 0 && (
          <div style={styles.emptyState}>
            <h3>Aucune demande de stage</h3>
            <p>Commencez par créer votre première demande de stage</p>
            <button style={styles.primaryButton}>Créer une demande</button>
          </div>
        )}
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  newRequestButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    '& th, & td': {
      padding: '1rem',
      textAlign: 'left',
      borderBottom: '1px solid #ddd'
    },
    '& th': {
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold',
      color: '#333'
    }
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
  statusRejected: {
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  statusDefault: {
    backgroundColor: '#e2e3e5',
    color: '#383d41'
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem'
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  primaryButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem'
  }
}

export default MyInternships