import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const studentMenu = [
    { path: '/student/dashboard', label: 'Tableau de Bord' },
    { path: '/student/internships', label: 'Mes Stages' },
    { path: '/student/profile', label: 'Mon Profil' }
  ]

  const adminMenu = [
    { path: '/admin/dashboard', label: 'Tableau de Bord' },
    { path: '/admin/students', label: 'Gérer Étudiants' },
    { path: '/admin/hospitals', label: 'Gérer Hôpitaux' }
  ]

  const hospitalMenu = [
    { path: '/hospital/dashboard', label: 'Tableau de Bord' },
    { path: '/hospital/requests', label: 'Demandes de Stage' },
    { path: '/hospital/profile', label: 'Profil Hôpital' }
  ]

  const menuItems = user?.role === 'admin' ? adminMenu : 
                   user?.role === 'student' ? studentMenu : 
                   hospitalMenu

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Menu</h3>
      <nav style={styles.nav}>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navLink,
              ...(isActive(item.path) ? styles.activeLink : {})
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#34495e',
    color: 'white',
    height: '100vh',
    padding: '1rem'
  },
  title: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  activeLink: {
    backgroundColor: '#3498db'
  }
}

export default Sidebar