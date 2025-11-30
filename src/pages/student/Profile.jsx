import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import FormInput from '../../components/FormInput'

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de Paris, 75001 Paris',
    university: 'Université de Paris',
    fieldOfStudy: 'Médecine',
    yearOfStudy: '3ème année',
    cv: ''
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, on enverrait les données au backend
    console.log('Profile updated:', profile)
    setIsEditing(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfile({
        ...profile,
        cv: file.name
      })
    }
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.header}>
          <h1>Mon Profil</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            style={isEditing ? styles.cancelButton : styles.editButton}
          >
            {isEditing ? 'Annuler' : 'Modifier le Profil'}
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <FormInput
              label="Nom complet"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
            
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            
            <FormInput
              label="Téléphone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
            
            <FormInput
              label="Adresse"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
            
            <FormInput
              label="Université"
              name="university"
              value={profile.university}
              onChange={handleChange}
              disabled={!isEditing}
            />
            
            <FormInput
              label="Domaine d'étude"
              name="fieldOfStudy"
              value={profile.fieldOfStudy}
              onChange={handleChange}
              disabled={!isEditing}
            />
            
            <FormInput
              label="Année d'étude"
              name="yearOfStudy"
              value={profile.yearOfStudy}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div style={styles.fileSection}>
            <label style={styles.label}>CV (PDF)</label>
            <div style={styles.fileInputContainer}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={!isEditing}
                style={styles.fileInput}
              />
              {profile.cv && (
                <span style={styles.fileName}>{profile.cv}</span>
              )}
            </div>
          </div>

          {isEditing && (
            <div style={styles.formActions}>
              <button type="submit" style={styles.saveButton}>
                Enregistrer les modifications
              </button>
            </div>
          )}
        </form>
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
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  fileSection: {
    marginBottom: '2rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333'
  },
  fileInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  fileInput: {
    padding: '0.5rem'
  },
  fileName: {
    color: '#666',
    fontStyle: 'italic'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  saveButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
}

export default StudentProfile