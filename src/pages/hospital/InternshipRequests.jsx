import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'

const InternshipRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      student: 'Marie Martin',
      email: 'marie.martin@email.com',
      position: 'Interne en médecine générale',
      department: 'Médecine Générale',
      period: '01/03/2024 - 31/08/2024',
      status: 'En attente',
      cv: 'cv_marie_martin.pdf',
      motivation: 'Lettre de motivation...'
    },
    {
      id: 2,
      student: 'Pierre Lambert',
      email: 'pierre.lambert@email.com',
      position: 'Stage en chirurgie cardiaque',
      department: 'Chirurgie Cardiaque',
      period: '15/02/2024 - 15/08/2024',
      status: 'En attente',
      cv: 'cv_pierre_lambert.pdf',
      motivation: 'Lettre de motivation...'
    }
  ])

  const handleStatusUpdate = (requestId, newStatus) => {
    setRequests(requests.map(request =>
      request.id === requestId 
        ? { ...request, status: newStatus }
        : request
    ))
  }

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Accepté':
        return styles.statusAccepted
      case 'Refusé':
        return styles.statusRejected
      case 'En attente':
        return styles.statusPending
      default:
        return styles.statusDefault
    }
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Demandes de Stage</h1>
        <p style={styles.subtitle}>Gérez les candidatures des étudiants</p>
        
        <div style={styles.requestsContainer}>
          {requests.map(request => (
            <div key={request.id} style={styles.requestCard}>
              <div style={styles.requestHeader}>
                <div style={styles.studentInfo}>
                  <h3>{request.student}</h3>
                  <p>{request.email}</p>
                </div>
                <span style={{...styles.status, ...getStatusStyle(request.status)}}>
                  {request.status}
                </span>
              </div>
              
              <div style={styles.requestDetails}>
                <div style={styles.detailItem}>
                  <strong>Poste:</strong> {request.position}
                </div>
                <div style={styles.detailItem}>
                  <strong>Département:</strong> {request.department}
                </div>
                <div style={styles.detailItem}>
                  <strong>Période:</strong> {request.period}
                </div>
                <div style={styles.detailItem}>
                  <strong>CV:</strong> 
                  <a href="#" style={styles.fileLink}>{request.cv}</a>
                </div>
              </div>

              <div style={styles.motivation}>
                <strong>Lettre de motivation:</strong>
                <p>{request.motivation}</p>
              </div>

              <div style={styles.actions}>
                {request.status === 'En attente' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(request.id, 'Accepté')}
                      style={styles.acceptButton}
                    >
                      Accepter
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(request.id, 'Refusé')}
                      style={styles.rejectButton}
                    >
                      Refuser
                    </button>
                  </>
                )}
                <button style={styles.contactButton}>
                  Contacter l'étudiant
                </button>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div style={styles.emptyState}>
            <h3>Aucune demande de stage</h3>
            <p>Les demandes des étudiants apparaîtront ici</p>
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
  subtitle: {
    color: '#666',
    marginBottom: '2rem'
  },
  requestsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  requestCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  requestHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  studentInfo: {
    flex: 1
  },
  status: {
    padding: '0.5rem 1rem',
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
  requestDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem'
  },
  detailItem: {
    marginBottom: '0.5rem'
  },
  fileLink: {
    color: '#3498db',
    textDecoration: 'none',
    marginLeft: '0.5rem'
  },
  motivation: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  contactButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
}

export default InternshipRequests